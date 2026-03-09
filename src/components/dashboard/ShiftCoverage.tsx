'use client';

import { shiftCoverageData } from '@/data/mockData';

export default function ShiftCoverage() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
      <h3 className="font-semibold mb-4">今月のシフト充足状況</h3>
      <div className="space-y-4">
        {shiftCoverageData.map((item) => {
          const barColor = item.rate >= 80 ? 'bg-green-500' : 'bg-amber-500';

          return (
            <div key={item.department}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm">{item.department}</span>
                <span className="text-sm font-medium">{item.rate}%</span>
              </div>
              <div className="bg-gray-200 rounded-full h-2.5">
                <div
                  className={`${barColor} rounded-full h-2.5 transition-all duration-500`}
                  style={{ width: `${item.rate}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
