import type { PayloadHandler } from 'payload'
import { VercelService } from '@/services/vercel.service'

export const monitorDeployment: PayloadHandler = async ({ job, payload }) => {
  const { siteId, deploymentId } = job.input

  if (!siteId || !deploymentId) {
    throw new Error('Missing required job input: siteId or deploymentId')
  }

  payload.logger.info(`🔍 Monitoring deployment ${deploymentId} for site ${siteId}`)

  let attempts = 0
  const maxAttempts = 60 // 10 minutes with 10-second intervals

  while (attempts < maxAttempts) {
    try {
      const { state, url } = await VercelService.getDeploymentStatus(deploymentId)

      payload.logger.info(`Deployment status: ${state} (attempt ${attempts + 1}/${maxAttempts})`)

      if (state === 'READY') {
        await payload.update({
          collection: 'sites',
          id: siteId,
          data: {
            deploymentStatus: 'deployed',
            vercelUrl: url,
            lastDeploymentDate: new Date().toISOString(),
          },
        })

        payload.logger.info(`✅ Deployment successful! Site available at: ${url}`)
        return { success: true, url }
      }

      if (state === 'ERROR' || state === 'CANCELED') {
        await payload.update({
          collection: 'sites',
          id: siteId,
          data: {
            deploymentStatus: 'failed',
            deploymentError: `Deployment ${state.toLowerCase()}`,
          },
        })

        payload.logger.error(`❌ Deployment ${state.toLowerCase()}`)
        return { success: false, state }
      }

      // Still building, wait before checking again
      await new Promise((resolve) => setTimeout(resolve, 10000)) // 10 seconds
      attempts++
    } catch (error) {
      payload.logger.error(`Error checking deployment status: ${error}`)
      attempts++

      if (attempts >= maxAttempts) {
        await payload.update({
          collection: 'sites',
          id: siteId,
          data: {
            deploymentStatus: 'failed',
            deploymentError: 'Deployment monitoring timeout',
          },
        })
        throw error
      }
    }
  }

  // Timeout
  await payload.update({
    collection: 'sites',
    id: siteId,
    data: {
      deploymentStatus: 'failed',
      deploymentError: 'Deployment timeout (exceeded 10 minutes)',
    },
  })

  payload.logger.error('❌ Deployment timeout')
  return { success: false, error: 'timeout' }
}
