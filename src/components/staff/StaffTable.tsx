'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Staff } from '@/types';

interface StaffTableProps {
  staffData: Staff[];
  sortKey: string;
  sortDir: 'asc' | 'desc';
  onSort: (key: string) => void;
  onDetailClick: (id: string) => void;
}

const ITEMS_PER_PAGE = 10;

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
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = staffData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // Reset to page 1 when data changes
  const safeCurrentPage = Math.min(currentPage, totalPages);
  if (safeCurrentPage !== currentPage) {
    setCurrentPage(safeCurrentPage);
  }

  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const pageData = staffData.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (safeCurrentPage > 3) pages.push('ellipsis');
      const start = Math.max(2, safeCurrentPage - 1);
      const end = Math.min(totalPages - 1, safeCurrentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (safeCurrentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

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
            {pageData.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                  該当する職員が見つかりません
                </td>
              </tr>
            ) : (
              pageData.map((staff, index) => (
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
                    <button
                      onClick={() => onDetailClick(staff.id)}
                      className="text-xs text-[#0F6FDE] hover:underline"
                    >
                      詳細
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#E2E8F0] bg-gray-50">
        <span className="text-sm text-gray-600">
          {totalItems > 0 ? `${startIndex + 1}-${endIndex} / ${totalItems}件` : '0件'}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage <= 1}
            className="w-8 h-8 rounded-lg text-sm flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          {getPageNumbers().map((page, i) =>
            page === 'ellipsis' ? (
              <span key={`e-${i}`} className="px-1 text-gray-400">...</span>
            ) : (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  page === safeCurrentPage
                    ? 'bg-[#0F6FDE] text-white'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage >= totalPages}
            className="w-8 h-8 rounded-lg text-sm flex items-center justify-center text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
