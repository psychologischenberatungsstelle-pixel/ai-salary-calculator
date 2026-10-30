import salariesData from '@/data/salaries.json';

export default function DashboardStats() {
  // Holt das Array, egal ob direkt oder verschachtelt
  const items = Array.isArray(salariesData) ? salariesData : (salariesData.calculators || []);
  const totalPages = items.length;
  const categories = Array.from(new Set(items.map((item: any) => item.category || 'Allgemein')));

  return (
    <div className="p-4 bg-gray-900 text-white rounded-xl border border-gray-800 shadow-lg my-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-sm text-blue-400 uppercase tracking-wider">SEO Programmatic Status</h4>
        <span className="px-2 py-0.5 text-xs bg-green-500/20 text-green-400 rounded-full font-medium">Live / Active</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-2xl font-extrabold text-white">{totalPages}</div>
          <div className="text-xs text-gray-400 mt-1">Generierte Seiten</div>
        </div>
        <div className="bg-gray-800 p-3 rounded-lg">
          <div className="text-2xl font-extrabold text-blue-400">{categories.length}</div>
          <div className="text-xs text-gray-400 mt-1">Kategorien / Bereiche</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400 text-right">
        QuickCV Affiliate: <span className="text-green-400 font-semibold">Aktiv</span>
      </div>
    </div>
  );
}