'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { departmentData } from '@/data/mockData';

export default function DepartmentChart() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
      <h3 className="font-semibold mb-4">部門別職員数</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={departmentData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={80} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#0F6FDE" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
