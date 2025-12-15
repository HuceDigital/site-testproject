import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where = category
      ? { category: { equals: category }, isActive: { equals: true } }
      : { isActive: { equals: true } }

    const components = await payload.find({
      collection: 'component-registry',
      where,
      depth: 1,
      limit: 100,
    })

    return NextResponse.json(components)
  } catch (error) {
    console.error('Error fetching components:', error)
    return NextResponse.json(
      { error: 'Failed to fetch components' },
      { status: 500 }
    )
  }
}
