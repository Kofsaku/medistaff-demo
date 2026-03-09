'use client';

import { useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { staffList } from '@/data/mockData';

const JOB_COLORS: Record<string, string> = {
  '看護師': '#0F6FDE',
  '医師': '#10B981',
  '事務職': '#EC4899',
  'その他': '#64748B',
  '技師': '#8B5CF6',
  '薬剤師': '#F59E0B',
};

export default function JobTypeChart() {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    staffList.forEach((s) => {
      counts[s.jobType] = (counts[s.jobType] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count, color: JOB_COLORS[name] || '#64748B' }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const total = staffList.length;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden min-w-0">
      <h3 className="font-semibold mb-4">職種別構成比</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}名 (${Math.round((Number(value) / total) * 100)}%)`, name]}
              contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: 40 }}>
          <div className="text-center">
            <p className="text-2xl font-bold">{total}名</p>
          </div>
        </div>
      </div>
    </div>
  );
}
