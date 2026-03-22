import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/StatsCard";
import RecentFiles from "../../components/RecentFiles";
import api from "../../services/api";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard/stats").then((res) => setData(res.data));
  }, []);

  if (!data)
    return (
      <DashboardLayout>
        <p className="text-gray-600">Loading dashboard...</p>
      </DashboardLayout>
    );

  const usagePercent = Math.round((data.usage.used / data.usage.limit) * 100);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Dashboard
      </h1>

      {/* TOP STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Files Processed (This Month)"
          value={`${data.usage.used} / ${data.usage.limit}`}
        />

        <StatsCard
          title="Total Files Processed"
          value={data.stats.totalFilesProcessed}
        />

        <StatsCard
          title="Usage Percentage"
          value={`${usagePercent}%`}
        />
      </div>

      {/* PROGRESS BAR */}
      <div className="bg-white p-6 rounded-xl shadow-sm border mt-6">
        <p className="font-semibold text-gray-800 mb-2">
          Monthly Usage Progress
        </p>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-blue-600 h-3 rounded-full"
            style={{ width: `${usagePercent}%` }}
          ></div>
        </div>

        <p className="text-gray-500 mt-2">
          Resets on:{" "}
          <span className="text-gray-700 font-medium">
            {new Date(data.usage.resetDate).toLocaleDateString()}
          </span>
        </p>
      </div>

      {/* RECENT FILES */}
      <RecentFiles files={data.latestFiles} />
    </DashboardLayout>
  );
}