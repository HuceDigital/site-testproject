'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Site {
  id: string
  siteName: string
  slug: string
  deploymentStatus: string
  vercelUrl?: string
  githubRepoUrl?: string
  createdAt: string
}

export default function DashboardPage() {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSites()
  }, [])

  const fetchSites = async () => {
    try {
      const response = await fetch('/api/sites')
      const data = await response.json()
      setSites(data.docs || [])
    } catch (error) {
      console.error('Failed to fetch sites:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed':
        return 'bg-green-100 text-green-800'
      case 'deploying':
      case 'creating-repo':
      case 'configuring':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      draft: 'Draft',
      'creating-repo': 'Creating Repo',
      configuring: 'Configuring',
      deploying: 'Deploying',
      deployed: 'Deployed',
      failed: 'Failed',
    }
    return labels[status] || status
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading your sites...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Websites</h1>
            <p className="text-gray-600 mt-1">Manage your deployed sites</p>
          </div>
          <Link
            href="/builder"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            + Create New Site
          </Link>
        </div>

        {/* Sites Grid */}
        {sites.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold mb-2">No sites yet</h2>
            <p className="text-gray-600 mb-6">Create your first website to get started</p>
            <Link
              href="/builder"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Your First Site
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sites.map((site) => (
              <div
                key={site.id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-1">{site.siteName}</h3>
                  <p className="text-sm text-gray-600">/{site.slug}</p>
                </div>

                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      site.deploymentStatus
                    )}`}
                  >
                    {getStatusLabel(site.deploymentStatus)}
                  </span>
                </div>

                {site.vercelUrl && (
                  <div className="mb-4">
                    <a
                      href={site.vercelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline break-all"
                    >
                      {site.vercelUrl} ↗
                    </a>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  {site.vercelUrl && site.deploymentStatus === 'deployed' && (
                    <a
                      href={site.vercelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Site
                    </a>
                  )}
                  {site.githubRepoUrl && (
                    <a
                      href={site.githubRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-gray-800 text-white text-center rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
                    >
                      GitHub
                    </a>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Created {new Date(site.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Link to Payload Admin */}
        <div className="mt-12 text-center">
          <Link href="/admin" className="text-blue-600 hover:underline">
            → Go to Payload Admin
          </Link>
        </div>
      </div>
    </div>
  )
}
