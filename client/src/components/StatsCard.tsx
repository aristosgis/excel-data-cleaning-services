export default function StatsCard({ title, value }: any) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold text-blue-600 mt-1">{value}</p>
    </div>
  );
}