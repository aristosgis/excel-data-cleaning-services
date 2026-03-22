import { useState } from "react";
import UploadBox from "../../components/UploadBox";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

export default function UploadFile() {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function handleUpload() {
    if (!file) {
      setError("Please select an Excel (.xlsx) file");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to upload file");
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Upload Excel File
      </h1>

      <UploadBox onFileSelect={setFile} />

      <div className="mt-6">
        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Upload & Clean"}
        </button>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="mt-4 text-red-600 font-medium">{error}</p>
      )}

      {/* RESULT BOX */}
      {result && (
        <div className="mt-8 p-6 bg-white shadow rounded-xl border">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            File Cleaned Successfully ✔
          </h2>

          <p className="text-gray-700 mb-2">
            Duplicate IDs Fixed:{" "}
            <span className="font-bold text-blue-700">
              {result.fixedDuplicates}
            </span>
          </p>

          <a
            href={`/${result.downloadUrl}`}
            target="_blank"
            className="inline-block mt-4 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            Download Cleaned File
          </a>
        </div>
      )}
    </DashboardLayout>
  );
}