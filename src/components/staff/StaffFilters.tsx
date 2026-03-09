'use client';

import { Search, Plus } from 'lucide-react';
import { departments, jobTypes, employmentTypes } from '@/data/mockData';

interface StaffFiltersProps {
  searchQuery: string;
  onSearchChange: (v: string) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  jobType: string;
  onJobTypeChange: (v: string) => void;
  employmentType: string;
  onEmploymentTypeChange: (v: string) => void;
  onCreateClick: () => void;
}

export default function StaffFilters({
  searchQuery,
  onSearchChange,
  department,
  onDepartmentChange,
  jobType,
  onJobTypeChange,
  employmentType,
  onEmploymentTypeChange,
  onCreateClick,
}: StaffFiltersProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="relative flex-1 min-w-[200px] max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="名前・職員番号で検索"
          className="w-full border border-[#E2E8F0] rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6FDE]/30 focus:border-[#0F6FDE]"
        />
      </div>

      <select
        value={department}
        onChange={(e) => onDepartmentChange(e.target.value)}
        className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6FDE]/30 focus:border-[#0F6FDE]"
      >
        <option value="">全部門</option>
        {departments.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <select
        value={jobType}
        onChange={(e) => onJobTypeChange(e.target.value)}
        className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6FDE]/30 focus:border-[#0F6FDE]"
      >
        <option value="">全職種</option>
        {jobTypes.map((j) => (
          <option key={j} value={j}>
            {j}
          </option>
        ))}
      </select>

      <select
        value={employmentType}
        onChange={(e) => onEmploymentTypeChange(e.target.value)}
        className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0F6FDE]/30 focus:border-[#0F6FDE]"
      >
        <option value="">全雇用形態</option>
        {employmentTypes.map((e) => (
          <option key={e} value={e}>
            {e}
          </option>
        ))}
      </select>

      <div className="ml-auto">
        <button
          onClick={onCreateClick}
          className="flex items-center gap-2 bg-[#0F6FDE] text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-[#0B5BBF] transition-colors"
        >
          <Plus className="w-4 h-4" />
          新規登録
        </button>
      </div>
    </div>
  );
}
