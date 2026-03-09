'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { jobTypeData } from '@/data/mockData';

export default function JobTypeChart() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden min-w-0">
      <h3 className="font-semibold mb-4">職種別構成比</h3>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={jobTypeData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
            >
              {jobTypeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}名`]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: 40 }}>
          <div className="text-center">
            <p className="text-2xl font-bold">248名</p>
          </div>
        </div>
      </div>
    </div>
  );
}
