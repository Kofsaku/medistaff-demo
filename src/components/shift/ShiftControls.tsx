'use client';

import { ChevronLeft, ChevronRight, User, Building2 } from 'lucide-react';
import { Staff } from '@/types';
import { departments } from '@/data/mockData';

interface ShiftControlsProps {
  year: number;
  month: number;
  onMonthChange: (dir: number) => void;
  department: string;
  onDepartmentChange: (v: string) => void;
  selectedStaff: Staff | null;
  onStaffSelect: (staff: Staff | null) => void;
  filteredStaff: Staff[];
}

const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

export default function ShiftControls({
  year,
  month,
  onMonthChange,
  department,
  onDepartmentChange,
  selectedStaff,
  onStaffSelect,
  filteredStaff,
}: ShiftControlsProps) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Month selector */}
      <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm border border-gray-200 px-1">
        <button
          onClick={() => onMonthChange(-1)}
          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="font-bold text-gray-800 min-w-[100px] text-center">
          {year}年{monthNames[month]}
        </span>
        <button
          onClick={() => onMonthChange(1)}
          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Department filter */}
      <div className="flex items-center gap-1.5">
        <Building2 className="w-4 h-4 text-gray-400" />
        <select
          value={department}
          onChange={(e) => {
            onDepartmentChange(e.target.value);
            onStaffSelect(null);
          }}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all"
        >
          <option value="">全部門</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Staff selector */}
      <div className="flex items-center gap-1.5">
        <User className="w-4 h-4 text-gray-400" />
        <select
          value={selectedStaff?.id || ''}
          onChange={(e) => {
            if (e.target.value === '') {
              onStaffSelect(null);
            } else {
              const staff = filteredStaff.find((s) => s.id === e.target.value);
              onStaffSelect(staff || null);
            }
          }}
          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white shadow-sm focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none transition-all min-w-[160px]"
        >
          <option value="">部署全体表示</option>
          {filteredStaff.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}（{staff.jobType}）
            </option>
          ))}
        </select>
      </div>

      {/* Legend */}
      <div className="ml-auto flex items-center gap-2">
        {[
          { label: '日勤', color: 'bg-blue-100 text-blue-700' },
          { label: '夜勤', color: 'bg-purple-100 text-purple-700' },
          { label: '準夜', color: 'bg-indigo-100 text-indigo-700' },
          { label: '当直', color: 'bg-red-100 text-red-700' },
          { label: '有休', color: 'bg-amber-100 text-amber-700' },
          { label: '休日', color: 'bg-gray-100 text-gray-400' },
        ].map(({ label, color }) => (
          <span key={label} className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${color}`}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
