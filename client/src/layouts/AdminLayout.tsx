import AdminSidebar from "../components/admin/AdminSidebar";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />

      <div className="flex-1 p-6 overflow-auto">
        <header className="text-2xl font-semibold mb-6 text-gray-800">
          Admin Panel
        </header>

        {children}
      </div>
    </div>
  );
}