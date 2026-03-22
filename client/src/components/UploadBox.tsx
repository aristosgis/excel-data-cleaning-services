import { useState } from "react";

export default function UploadBox({ onFileSelect }: any) {
  const [fileName, setFileName] = useState("");

  function handleChange(e: any) {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  }

  return (
    <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl bg-white text-center hover:bg-gray-50 transition">
      <h3 className="text-xl font-semibold mb-2 text-gray-700">
        Upload Excel File (.xlsx)
      </h3>

      <p className="text-gray-500 mb-4">Your file will be cleaned instantly</p>

      <label className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
        Select File
        <input type="file" accept=".xlsx" className="hidden" onChange={handleChange} />
      </label>

      {fileName && (
        <p className="mt-3 text-green-600 font-medium">Selected: {fileName}</p>
      )}
    </div>
  );
}