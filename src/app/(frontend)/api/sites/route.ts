import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'
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

// GET - List user's sites
export async function GET() {
  try {
    const payload = await getPayload({ config })
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const sites = await payload.find({
      collection: 'sites',
      where: {
        owner: {
          equals: user.id,
        },
      },
      depth: 1,
      limit: 100,
    })

    return NextResponse.json(sites)
  } catch (error) {
    console.error('Error fetching sites:', error)
    return NextResponse.json({ error: 'Failed to fetch sites' }, { status: 500 })
  }
}

// POST - Create new site
export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const site = await payload.create({
      collection: 'sites',
      data: {
        ...body,
        owner: user.id,
        deploymentStatus: 'draft',
      },
    })

    return NextResponse.json({ success: true, doc: site })
  } catch (error) {
    console.error('Error creating site:', error)
    return NextResponse.json({ error: 'Failed to create site' }, { status: 500 })
  }
}
