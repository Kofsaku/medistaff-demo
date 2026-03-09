'use client';

import { useState } from 'react';
import AttendanceBoard from '@/components/attendance/AttendanceBoard';
import AttendanceLog from '@/components/attendance/AttendanceLog';

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState<'daily' | 'monthly'>('daily');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">勤怠管理</h1>
      <AttendanceBoard />
      <AttendanceLog activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
