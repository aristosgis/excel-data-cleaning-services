export default function StatCard({ title, value }: any) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border">
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-3xl font-bold text-blue-700">{value}</p>
    </div>
  );
}