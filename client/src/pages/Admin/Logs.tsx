import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

export default function Logs() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/logs").then((res) => setLogs(res.data));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">System Logs</h2>

      <div className="bg-white shadow-sm rounded-xl p-4 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="p-2">Action</th>
              <th className="p-2">Details</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.details || "-"}</td>
                <td className="p-2">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}