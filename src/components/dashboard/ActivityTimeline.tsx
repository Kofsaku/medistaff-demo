'use client';

import { activities } from '@/data/mockData';

export default function ActivityTimeline() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 overflow-hidden">
      <h3 className="font-semibold mb-4">直近のアクティビティ</h3>
      <div className="space-y-0">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline indicator */}
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
              {index < activities.length - 1 && (
                <div className="w-0.5 bg-gray-200 flex-1 min-h-6" />
              )}
            </div>
            {/* Content */}
            <div className="pb-4">
              <span className="text-sm text-[#64748B] font-mono">{activity.time}</span>
              <p className="text-sm mt-0.5">{activity.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
