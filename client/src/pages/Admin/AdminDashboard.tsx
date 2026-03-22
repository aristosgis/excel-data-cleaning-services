import { useEffect, useState } from "react";
import StatCard from "../../components/admin/StatCard";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  if (!stats) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Files Processed" value={stats.totalFilesProcessed} />
        <StatCard title="System Logs" value={stats.totalLogs} />
      </div>
    </AdminLayout>
  );
}