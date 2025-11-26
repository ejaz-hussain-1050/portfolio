import { verifySession } from "@/lib/auth/session"
import { redirect } from "next/navigation"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const session = await verifySession()

  if (!session) {
    return <AdminLogin />
  }

  return <AdminDashboard />
}
