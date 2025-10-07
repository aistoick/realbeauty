import AdminWrapper from "@/components/admin/AdminWrapper"
import AdminDashboard from "@/components/admin/AdminDashboard"

export const metadata = {
  title: "Admin Panel | RealBeauty",
  description: "Manage products and reviews easily",
}

export default function AdminPage() {
  return (
    <AdminWrapper>
      <AdminDashboard />
    </AdminWrapper>
  )
}
