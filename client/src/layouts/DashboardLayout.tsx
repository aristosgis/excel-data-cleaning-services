import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }: any) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}