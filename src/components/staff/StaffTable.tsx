'use client';

import { ChevronUp, ChevronDown, MoreVertical } from 'lucide-react';
import { Staff } from '@/types';

interface StaffTableProps {
  staffData: Staff[];
  sortKey: string;
  sortDir: 'asc' | 'desc';
  onSort: (key: string) => void;
  onDetailClick: (id: string) => void;
}

const jobTypeBadgeColor: Record<string, string> = {
  '医師': 'bg-blue-100 text-blue-700',
  '看護師': 'bg-green-100 text-green-700',
  '薬剤師': 'bg-amber-100 text-amber-700',
  '技師': 'bg-purple-100 text-purple-700',
  '事務職': 'bg-pink-100 text-pink-700',
  'その他': 'bg-gray-100 text-gray-700',
};

const statusBadgeColor: Record<string, string> = {
  '出勤': 'bg-green-100 text-green-700',
  '休暇': 'bg-amber-100 text-amber-700',
  '退職': 'bg-gray-100 text-gray-500',
};

function SortIcon({ columnKey, sortKey, sortDir }: { columnKey: string; sortKey: string; sortDir: 'asc' | 'desc' }) {
  if (sortKey !== columnKey) {
    return (
      <span className="inline-flex flex-col ml-1 opacity-30">
        <ChevronUp className="w-3 h-3 -mb-1" />
        <ChevronDown className="w-3 h-3" />
      </span>
    );
  }
  return sortDir === 'asc' ? (
    <ChevronUp className="inline w-4 h-4 ml-1" />
  ) : (
    <ChevronDown className="inline w-4 h-4 ml-1" />
  );
}

export default function StaffTable({
  staffData,
  sortKey,
  sortDir,
  onSort,
  onDetailClick,
}: StaffTableProps) {
  const sortableColumns = ['id', 'name', 'joinDate'];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm" style={{ minWidth: 830 }}>
          <thead>
            <tr className="bg-gray-50 border-b border-[#E2E8F0]">
              <th
                className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer select-none"
                style={{ width: 80 }}
                onClick={() => onSort('id')}
              >
                <span className="inline-flex items-center">
                  職員番号
                  <SortIcon columnKey="id" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th
                className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer select-none"
                style={{ width: 160 }}
                onClick={() => onSort('name')}
              >
                <span className="inline-flex items-center">
                  氏名
                  <SortIcon columnKey="name" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600" style={{ width: 120 }}>
                部門
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600" style={{ width: 100 }}>
                職種
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600" style={{ width: 100 }}>
                雇用形態
              </th>
              <th
                className="text-left px-4 py-3 font-medium text-gray-600 cursor-pointer select-none"
                style={{ width: 100 }}
                onClick={() => onSort('joinDate')}
              >
                <span className="inline-flex items-center">
                  入職日
                  <SortIcon columnKey="joinDate" sortKey={sortKey} sortDir={sortDir} />
                </span>
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600" style={{ width: 90 }}>
                ステータス
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600" style={{ width: 80 }}>
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => (
              <tr
                key={staff.id}
                className={`border-b border-[#E2E8F0] last:border-b-0 hover:bg-blue-50 transition-colors duration-150 ${
                  index % 2 === 1 ? 'bg-gray-50' : ''
                }`}
              >
                <td className="px-4 py-3 text-gray-500 font-mono text-xs">{staff.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0F6FDE] text-white flex items-center justify-center text-xs font-medium shrink-0">
                      {staff.name.charAt(0)}
                    </div>
                    <button
                      onClick={() => onDetailClick(staff.id)}
                      className="text-[#0F6FDE] hover:underline font-medium text-left"
                    >
                      {staff.name}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-700">{staff.department}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      jobTypeBadgeColor[staff.jobType] || jobTypeBadgeColor['その他']
                    }`}
                  >
                    {staff.jobType}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{staff.employmentType}</td>
                <td className="px-4 py-3 text-gray-700">{staff.joinDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      statusBadgeColor[staff.status] || 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onDetailClick(staff.id)}
                      className="text-xs text-[#0F6FDE] hover:underline"
                    >
                      詳細
                    </button>
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0] bg-gray-50">
        <span className="text-sm text-gray-600">1-15 / 248件</span>
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === 1
                  ? 'bg-[#0F6FDE] text-white'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-gray-400">...</span>
          <button className="w-8 h-8 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-200">
            17
          </button>
        </div>
      </div>
    </div>
  );
}
