import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated via Payload session cookie
  const cookieStore = await cookies()
  const payloadToken = cookieStore.get('payload-token')

  // If no token, redirect to admin login
  if (!payloadToken) {
    redirect('/admin/login?redirect=/dashboard')
  }

  return <>{children}</>
}
