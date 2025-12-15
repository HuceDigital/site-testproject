export class VercelService {
  private static readonly API_URL = 'https://api.vercel.com'
  private static readonly TOKEN = process.env.VERCEL_TOKEN
  private static readonly TEAM_ID = process.env.VERCEL_TEAM_ID

  /**
   * Create a Vercel project
   */
  static async createProject(
    siteName: string,
    githubRepoUrl: string
  ): Promise<{ projectId: string; url: string }> {
    if (!this.TOKEN) {
      throw new Error('VERCEL_TOKEN environment variable is not set')
    }

    const repoName = githubRepoUrl.split('/').pop()?.replace('.git', '') || siteName

    try {
      const projectName = siteName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')

      const response = await fetch(`${this.API_URL}/v9/projects`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectName,
          framework: 'nextjs',
          gitRepository: {
            repo: repoName,
            type: 'github',
          },
          environmentVariables: [
            {
              key: 'DATABASE_URI',
              value: process.env.DATABASE_URI_TEMPLATE || 'file:./test.db',
              target: ['production', 'preview', 'development'],
            },
            {
              key: 'PAYLOAD_SECRET',
              value: this.generateSecret(),
              target: ['production', 'preview', 'development'],
            },
            {
              key: 'NEXT_PUBLIC_SERVER_URL',
              value: '', // Will be set after first deployment
              target: ['production', 'preview', 'development'],
            },
          ],
          buildCommand: 'pnpm build',
          devCommand: 'pnpm dev',
          installCommand: 'pnpm install',
          outputDirectory: '.next',
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Vercel API error: ${response.status} - ${error}`)
      }

      const data = await response.json()

      console.log(`✓ Created Vercel project: ${projectName}`)

      return {
        projectId: data.id,
        url: `https://${data.name}.vercel.app`,
      }
    } catch (error) {
      console.error('Failed to create Vercel project:', error)
      throw new Error(`Vercel project creation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Trigger a deployment
   */
  static async triggerDeployment(
    projectId: string
  ): Promise<{ deploymentId: string; url: string }> {
    if (!this.TOKEN) {
      throw new Error('VERCEL_TOKEN environment variable is not set')
    }

    try {
      const response = await fetch(`${this.API_URL}/v13/deployments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: projectId,
          projectId,
          target: 'production',
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Vercel API error: ${response.status} - ${error}`)
      }

      const data = await response.json()

      console.log(`✓ Triggered deployment: ${data.id}`)

      return {
        deploymentId: data.id,
        url: data.url || `https://${data.name}.vercel.app`,
      }
    } catch (error) {
      console.error('Failed to trigger deployment:', error)
      throw new Error(`Deployment trigger failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Check deployment status
   */
  static async getDeploymentStatus(
    deploymentId: string
  ): Promise<{
    state: 'BUILDING' | 'ERROR' | 'READY' | 'QUEUED' | 'CANCELED'
    url?: string
  }> {
    if (!this.TOKEN) {
      throw new Error('VERCEL_TOKEN environment variable is not set')
    }

    try {
      const response = await fetch(`${this.API_URL}/v13/deployments/${deploymentId}`, {
        headers: {
          Authorization: `Bearer ${this.TOKEN}`,
        },
      })

      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Vercel API error: ${response.status} - ${error}`)
      }

      const data = await response.json()

      return {
        state: data.readyState,
        url: data.url ? `https://${data.url}` : undefined,
      }
    } catch (error) {
      console.error('Failed to get deployment status:', error)
      throw new Error(`Status check failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Generate a random secret
   */
  private static generateSecret(): string {
    return require('crypto').randomBytes(32).toString('hex')
  }
}
