import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import api from "../../services/api";
import FileRow from "../../components/history/FileRow";

export default function FileHistory() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/files/history").then((res) => {
      setFiles(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        File History
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-gray-600">Loading your files...</p>
      )}

      {/* No Files */}
      {!loading && files.length === 0 && (
        <p className="text-gray-500">No files uploaded yet.</p>
      )}

      {/* Files Table */}
      {!loading && files.length > 0 && (
        <div className="bg-white p-6 shadow-sm rounded-xl border overflow-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="p-3">File Name</th>
                <th className="p-3">Uploaded On</th>
                <th className="p-3 text-right">Download</th>
              </tr>
            </thead>

            <tbody>
              {files.map((file) => (
                <FileRow key={file.id} file={file} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
}