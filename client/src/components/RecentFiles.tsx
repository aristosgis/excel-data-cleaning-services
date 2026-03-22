export default function RecentFiles({ files }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Files</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">File Name</th>
            <th className="p-2">Date</th>
            <th className="p-2 text-right">Download</th>
          </tr>
        </thead>

        <tbody>
          {files.map((f: any) => (
            <tr key={f.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{f.fileName}</td>
              <td className="p-2">{new Date(f.createdAt).toLocaleString()}</td>
              <td className="p-2 text-right">
                <a
                  href={`/${f.fileUrl}`}
                  className="text-blue-700 hover:underline"
                  target="_blank"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}

          {files.length === 0 && (
            <tr>
              <td colSpan={3} className="text-center text-gray-500 p-4">
                No files uploaded yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}