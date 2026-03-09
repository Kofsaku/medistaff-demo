'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { staffList } from '@/data/mockData';

export default function DepartmentChart() {
  const data = useMemo(() => {
    const counts: Record<string, number> = {};
    staffList.forEach((s) => {
      counts[s.department] = (counts[s.department] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
      <h3 className="font-semibold mb-4">部門別職員数</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={110} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value) => [`${value}名`, '職員数']}
            contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }}
          />
          <Bar dataKey="count" fill="#0F6FDE" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
