'use client';

import { Clock, CalendarDays } from 'lucide-react';

interface LeaveSummaryProps {
  pendingCount: number;
  monthlyLeaveCount: number;
}

export default function LeaveSummary({ pendingCount, monthlyLeaveCount }: LeaveSummaryProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="bg-amber-100 rounded-full p-3">
            <Clock className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-[#64748B]">承認待ち件数</p>
            <p className="text-2xl font-bold">{pendingCount}件</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 rounded-full p-3">
            <CalendarDays className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-[#64748B]">今月の休暇取得者</p>
            <p className="text-2xl font-bold">{monthlyLeaveCount}名</p>
          </div>
        </div>
      </div>
    </div>
  );
}
