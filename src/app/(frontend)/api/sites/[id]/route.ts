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

// GET - Get single site
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const site = await payload.findByID({
      collection: 'sites',
      id,
      depth: 1,
    })

    // Check if user owns this site
    if (typeof site.owner === 'object' && site.owner.id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ doc: site })
  } catch (error) {
    console.error('Error fetching site:', error)
    return NextResponse.json({ error: 'Failed to fetch site' }, { status: 500 })
  }
}

// PATCH - Update site
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    // Verify ownership before updating
    const existingSite = await payload.findByID({
      collection: 'sites',
      id,
    })

    if (typeof existingSite.owner === 'object' && existingSite.owner.id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const site = await payload.update({
      collection: 'sites',
      id,
      data: body,
    })

    return NextResponse.json({ success: true, doc: site })
  } catch (error) {
    console.error('Error updating site:', error)
    return NextResponse.json({ error: 'Failed to update site' }, { status: 500 })
  }
}

// DELETE - Delete site
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })
    const user = await getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Verify ownership before deleting
    const existingSite = await payload.findByID({
      collection: 'sites',
      id,
    })

    if (typeof existingSite.owner === 'object' && existingSite.owner.id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await payload.delete({
      collection: 'sites',
      id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting site:', error)
    return NextResponse.json({ error: 'Failed to delete site' }, { status: 500 })
  }
}
