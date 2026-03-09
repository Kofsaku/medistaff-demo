'use client';

import KpiCards from '@/components/dashboard/KpiCards';
import DepartmentChart from '@/components/dashboard/DepartmentChart';
import JobTypeChart from '@/components/dashboard/JobTypeChart';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import ShiftCoverage from '@/components/dashboard/ShiftCoverage';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">ダッシュボード</h1>
      <KpiCards />
      <div className="grid grid-cols-2 gap-6">
        <div className="min-w-0">
          <DepartmentChart />
        </div>
        <div className="min-w-0">
          <JobTypeChart />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="min-w-0">
          <ActivityTimeline />
        </div>
        <div className="min-w-0">
          <ShiftCoverage />
        </div>
      </div>
    </div>
  );
}
