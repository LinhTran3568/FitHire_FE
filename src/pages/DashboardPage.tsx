import { Badge } from '@components/ui';

/**
 * Dashboard page – example of a feature page.
 */
export default function DashboardPage() {
  const stats = [
    { label: 'Total Users', value: '12,345', badge: 'success', change: '+12%' },
    { label: 'Revenue', value: '$98,430', badge: 'info', change: '+8%' },
    { label: 'Active Sessions', value: '3,201', badge: 'warning', change: '-3%' },
    { label: 'Error Rate', value: '0.12%', badge: 'danger', change: '+0.02%' },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your application metrics.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <Badge variant={stat.badge}>{stat.change}</Badge>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
