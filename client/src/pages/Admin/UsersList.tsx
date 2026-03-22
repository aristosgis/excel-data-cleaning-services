import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../services/api";

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-xl font-semibold mb-4">Users</h2>

      <div className="bg-white shadow-sm rounded-xl p-4 overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Monthly Usage</th>
              <th className="p-2">Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">{u.monthlyUploads} / 5</td>
                <td className="p-2">{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}