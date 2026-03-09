'use client';

import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { attendanceRecords, monthlyAttendance } from '@/data/mockData';
import type { AttendanceRecord, MonthlyAttendance } from '@/types';

interface AttendanceLogProps {
  activeTab: 'daily' | 'monthly';
  onTabChange: (tab: 'daily' | 'monthly') => void;
}

type SortKey = 'name' | 'clockIn';
type SortDirection = 'asc' | 'desc';

function getStatusBadge(status: AttendanceRecord['status']) {
  const styles: Record<AttendanceRecord['status'], string> = {
    '出勤中': 'bg-green-100 text-green-800',
    '退勤済': 'bg-gray-100 text-gray-800',
    '遅刻': 'bg-red-100 text-red-800',
    '未打刻': 'bg-amber-100 text-amber-800',
  };

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function getAvatarInitial(name: string) {
  return name.charAt(0);
}

function isLateClockIn(clockIn: string | null): boolean {
  if (!clockIn) return false;
  return clockIn > '09:00';
}

export default function AttendanceLog({ activeTab, onTabChange }: AttendanceLogProps) {
  const [sortKey, setSortKey] = useState<SortKey>('clockIn');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortedRecords = [...attendanceRecords].sort((a, b) => {
    let comparison = 0;

    if (sortKey === 'name') {
      comparison = a.name.localeCompare(b.name, 'ja');
    } else if (sortKey === 'clockIn') {
      const aTime = a.clockIn ?? '99:99';
      const bTime = b.clockIn ?? '99:99';
      comparison = aTime.localeCompare(bTime);
    }

    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const tabs = [
    { key: 'daily' as const, label: '本日の出退勤' },
    { key: 'monthly' as const, label: '月次集計' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Tab Bar */}
      <div className="border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        {activeTab === 'daily' ? (
          <DailyTable
            records={sortedRecords}
            sortKey={sortKey}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        ) : (
          <MonthlyTable records={monthlyAttendance} />
        )}
      </div>
    </div>
  );
}

interface DailyTableProps {
  records: AttendanceRecord[];
  sortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

function SortableHeader({
  label,
  sortKey,
  currentSortKey,
  sortDirection,
  onSort,
}: {
  label: string;
  sortKey: SortKey;
  currentSortKey: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}) {
  const isActive = currentSortKey === sortKey;

  return (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer hover:bg-gray-100 select-none"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown
          className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`}
        />
        {isActive && (
          <span className="text-blue-600 text-[10px]">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        )}
      </div>
    </th>
  );
}

function DailyTable({ records, sortKey, sortDirection, onSort }: DailyTableProps) {
  return (
    <table className="w-full" style={{ minWidth: 800 }}>
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            職員番号
          </th>
          <SortableHeader
            label="氏名"
            sortKey="name"
            currentSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            部門
          </th>
          <SortableHeader
            label="出勤時刻"
            sortKey="clockIn"
            currentSortKey={sortKey}
            sortDirection={sortDirection}
            onSort={onSort}
          />
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            退勤時刻
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            勤務時間
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            残業
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            ステータス
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {records.map((record, index) => (
          <tr
            key={record.staffId}
            className={`hover:bg-blue-50 transition-colors ${
              index % 2 === 1 ? 'bg-gray-50/50' : ''
            }`}
          >
            <td className="px-4 py-3 text-sm text-gray-700">{record.staffId}</td>
            <td className="px-4 py-3 text-sm text-gray-900">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium shrink-0">
                  {getAvatarInitial(record.name)}
                </div>
                <span className="font-medium">{record.name}</span>
              </div>
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">{record.department}</td>
            <td className="px-4 py-3 text-sm">
              {record.clockIn ? (
                <span
                  className={
                    isLateClockIn(record.clockIn) ? 'text-red-600' : 'text-green-600'
                  }
                >
                  {record.clockIn}
                </span>
              ) : (
                <span className="text-gray-400">&mdash;</span>
              )}
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">
              {record.clockOut ?? <span className="text-gray-400">&mdash;</span>}
            </td>
            <td className="px-4 py-3 text-sm text-gray-700">
              {record.workHours ?? <span className="text-gray-400">&mdash;</span>}
            </td>
            <td className="px-4 py-3 text-sm">
              {record.overtime ? (
                <span className="text-red-600">{record.overtime}</span>
              ) : (
                <span className="text-gray-400">&mdash;</span>
              )}
            </td>
            <td className="px-4 py-3 text-sm">{getStatusBadge(record.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function MonthlyTable({ records }: { records: MonthlyAttendance[] }) {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            氏名
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            出勤日数
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            欠勤
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            遅刻
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            早退
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            残業時間
          </th>
          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
            有休消化
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {records.map((record, index) => {
          const isOvertimeExceeded = record.overtime > 40;

          return (
            <tr
              key={record.staffId}
              className={`transition-colors ${
                isOvertimeExceeded
                  ? 'bg-red-50'
                  : index % 2 === 1
                    ? 'bg-gray-50/50'
                    : ''
              }`}
            >
              <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                {record.name}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{record.workDays}日</td>
              <td className="px-4 py-3 text-sm text-gray-700">{record.absent}日</td>
              <td className="px-4 py-3 text-sm text-gray-700">{record.late}回</td>
              <td className="px-4 py-3 text-sm text-gray-700">{record.earlyLeave}回</td>
              <td className="px-4 py-3 text-sm text-gray-700">
                <span className={isOvertimeExceeded ? 'text-red-600 font-medium' : ''}>
                  {record.overtime.toFixed(1)}h
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{record.paidLeave}日</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
