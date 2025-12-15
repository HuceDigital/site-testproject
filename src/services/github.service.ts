import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const GITHUB_ORG = process.env.GITHUB_ORG || ''
const TEMPLATE_REPO = 'Velen-Website-Template'

export class GitHubService {
  /**
   * Create a new repository from the Website template
   */
  static async createRepoFromTemplate(
    siteName: string,
    slug: string
  ): Promise<string> {
    const repoName = `site-${slug}`

    try {
      const { data: repo } = await octokit.repos.createUsingTemplate({
        template_owner: GITHUB_ORG,
        template_repo: TEMPLATE_REPO,
        owner: GITHUB_ORG,
        name: repoName,
        description: `Website for ${siteName}`,
        private: false,
        include_all_branches: false,
      })

      console.log(`✓ Created GitHub repo: ${repo.html_url}`)
      return repo.html_url
    } catch (error) {
      console.error('Failed to create GitHub repo:', error)
      throw new Error(`GitHub repo creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Update or create a file in the repository
   */
  static async updateFile(
    repoName: string,
    filePath: string,
    content: string,
    message: string
  ): Promise<void> {
    try {
      // Get current file SHA if it exists
      let sha: string | undefined

      try {
        const { data } = await octokit.repos.getContent({
          owner: GITHUB_ORG,
          repo: repoName,
          path: filePath,
        })

        if ('sha' in data) {
          sha = data.sha
        }
      } catch (error) {
        // File doesn't exist, that's ok - we'll create it
      }

      // Create or update the file
      await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_ORG,
        repo: repoName,
        path: filePath,
        message,
        content: Buffer.from(content).toString('base64'),
        sha,
      })

      console.log(`✓ Updated file: ${filePath}`)
    } catch (error) {
      console.error(`Failed to update file ${filePath}:`, error)
      throw new Error(`File update failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Inject site configuration into the new repository
   */
  static async injectSiteConfiguration(
    repoName: string,
    siteConfig: any
  ): Promise<void> {
    try {
      console.log(`Injecting configuration into ${repoName}...`)

      // Import generators
      const { generateSeedFileContent } = await import('@/utilities/generateSeed')
      const { generateTailwindConfig } = await import('@/utilities/generateTailwindConfig')
      const { generatePackageJson } = await import('@/utilities/generatePackageJson')
      const { generateRenderBlocks } = await import('@/utilities/generateRenderBlocks')

      // 1. Update seed file
      const seedContent = generateSeedFileContent(siteConfig)
      await this.updateFile(
        repoName,
        'src/endpoints/seed/index.ts',
        seedContent,
        'Add generated seed file'
      )

      // 2. Update tailwind config with theme colors
      const tailwindConfig = generateTailwindConfig(siteConfig.theme)
      await this.updateFile(
        repoName,
        'tailwind.config.mjs',
        tailwindConfig,
        'Update theme colors'
      )

      // 3. Update package.json with npm component dependencies
      const npmComponents = siteConfig.selectedBlocks
        ?.filter((block: any) => block.blockType === 'featureCard' || block.blockType === 'sampleButton')
        .map((block: any) => {
          if (block.blockType === 'featureCard') return '@huce-digital/sample-block'
          if (block.blockType === 'sampleButton') return '@huce-digital/sample-button'
          return null
        })
        .filter(Boolean) || []

      const packageJson = generatePackageJson(siteConfig, npmComponents)
      await this.updateFile(
        repoName,
        'package.json',
        JSON.stringify(packageJson, null, 2),
        'Update dependencies'
      )

      // 4. Update RenderBlocks to include npm components
      if (npmComponents.length > 0) {
        const renderBlocksContent = generateRenderBlocks(siteConfig.selectedBlocks || [])
        await this.updateFile(
          repoName,
          'src/blocks/RenderBlocks.tsx',
          renderBlocksContent,
          'Add npm component mappings'
        )
      }

      console.log(`✓ Configuration injected successfully`)
    } catch (error) {
      console.error('Failed to inject configuration:', error)
      throw new Error(`Configuration injection failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
}
