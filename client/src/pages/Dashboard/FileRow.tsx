export default function FileRow({ file }: any) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="p-3">{file.fileName}</td>
      <td className="p-3">
        {new Date(file.createdAt).toLocaleString()}
      </td>
      <td className="p-3 text-right">
        <a
          href={`/${file.fileUrl}`}
          className="text-blue-600 hover:underline"
          target="_blank"
        >
          Download
        </a>
      </td>
    </tr>
  );
}