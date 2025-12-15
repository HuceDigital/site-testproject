import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { GitHubService } from '@/services/github.service'
import { VercelService } from '@/services/vercel.service'
import { cookies } from 'next/headers'

// Get user from cookie
async function getUser() {
  const payload = await getPayload({ config })
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')

  if (!token) {
    return null
  }

  try {
    const { user } = await payload.auth({ headers: { cookie: `payload-token=${token.value}` } })
    return user
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  const payload = await getPayload({ config })
  const user = await getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { siteId } = await request.json()

    if (!siteId) {
      return NextResponse.json({ error: 'Site ID is required' }, { status: 400 })
    }

    // Get site data
    const site = await payload.findByID({
      collection: 'sites',
      id: siteId,
    })

    if (!site) {
      return NextResponse.json({ error: 'Site not found' }, { status: 404 })
    }

    // Verify ownership
    if (typeof site.owner === 'object' && site.owner.id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    console.log(`\n🚀 Starting deployment for: ${site.siteName}`)

    // Step 1: Create GitHub repo
    console.log('Step 1: Creating GitHub repository...')
    await payload.update({
      collection: 'sites',
      id: siteId,
      data: { deploymentStatus: 'creating-repo' },
    })

    const githubRepoUrl = await GitHubService.createRepoFromTemplate(
      site.siteName,
      site.slug
    )

    await payload.update({
      collection: 'sites',
      id: siteId,
      data: { githubRepoUrl },
    })

    // Step 2: Inject configuration
    console.log('Step 2: Injecting site configuration...')
    await payload.update({
      collection: 'sites',
      id: siteId,
      data: { deploymentStatus: 'configuring' },
    })

    const repoName = githubRepoUrl.split('/').pop()?.replace('.git', '') || ''
    await GitHubService.injectSiteConfiguration(repoName, site)

    // Step 3: Create Vercel project
    console.log('Step 3: Creating Vercel project...')
    await payload.update({
      collection: 'sites',
      id: siteId,
      data: { deploymentStatus: 'deploying' },
    })

    const { projectId, url } = await VercelService.createProject(
      site.siteName,
      githubRepoUrl
    )

    // Step 4: Trigger deployment
    console.log('Step 4: Triggering deployment...')
    const { deploymentId } = await VercelService.triggerDeployment(projectId)

    // Step 5: Update site with deployment info
    await payload.update({
      collection: 'sites',
      id: siteId,
      data: {
        vercelProjectId: projectId,
        vercelUrl: url,
        lastDeploymentDate: new Date().toISOString(),
      },
    })

    // Step 6: Queue monitoring job
    console.log('Step 5: Starting deployment monitor...')
    await payload.jobs.queue({
      task: 'monitor-deployment',
      input: {
        siteId,
        deploymentId,
      },
    })

    console.log(`✅ Deployment initiated successfully!\n`)

    return NextResponse.json({
      success: true,
      url,
      projectId,
      message: 'Deployment started. Monitoring in progress...',
    })
  } catch (error) {
    console.error('❌ Deployment error:', error)

    const { siteId } = await request.json().catch(() => ({}))

    if (siteId) {
      await payload.update({
        collection: 'sites',
        id: siteId,
        data: {
          deploymentStatus: 'failed',
          deploymentError: error instanceof Error ? error.message : 'Unknown error',
        },
      })
    }

    return NextResponse.json(
      {
        error: 'Deployment failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
