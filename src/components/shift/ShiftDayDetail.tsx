'use client';

import { X } from 'lucide-react';
import { Staff, ShiftType } from '@/types';

interface ShiftDayDetailProps {
  year: number;
  month: number;
  day: number;
  filteredStaff: Staff[];
  shiftData: Record<string, ShiftType[]>;
  onShiftChange: (staffId: string, dayIndex: number, type: ShiftType) => void;
  onClose: () => void;
}

const shiftTypes: ShiftType[] = ['日', '夜', '準', '休', '有', '当'];

const shiftStyles: Record<ShiftType, string> = {
  '日': 'bg-blue-100 text-blue-700 border-blue-200',
  '夜': 'bg-purple-100 text-purple-700 border-purple-200',
  '準': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  '休': 'bg-gray-100 text-gray-400 border-gray-200',
  '有': 'bg-amber-100 text-amber-700 border-amber-200',
  '当': 'bg-red-100 text-red-700 border-red-200',
};

const shiftLabels: Record<ShiftType, string> = {
  '日': '日勤',
  '夜': '夜勤',
  '準': '準夜勤',
  '休': '休日',
  '有': '有休',
  '当': '当直',
};

const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

export default function ShiftDayDetail({
  year,
  month,
  day,
  filteredStaff,
  shiftData,
  onShiftChange,
  onClose,
}: ShiftDayDetailProps) {
  const date = new Date(year, month, day);
  const dow = date.getDay();
  const dayIndex = day - 1;

  // Count shifts for this day
  const counts: Record<ShiftType, number> = { '日': 0, '夜': 0, '準': 0, '休': 0, '有': 0, '当': 0 };
  filteredStaff.forEach((staff) => {
    const shift = shiftData[staff.id]?.[dayIndex];
    if (shift) counts[shift]++;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm h-full flex flex-col animate-[fadeIn_0.2s_ease-out]">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
        <div>
          <h3 className="font-bold text-lg text-gray-800">
            {month + 1}月{day}日
            <span className={`ml-1 text-sm font-medium ${
              dow === 0 ? 'text-red-500' : dow === 6 ? 'text-blue-500' : 'text-gray-500'
            }`}>
              ({dayLabels[dow]})
            </span>
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Shift summary badges */}
      <div className="px-4 py-2 border-b border-gray-100 flex-shrink-0">
        <div className="flex flex-wrap gap-1.5">
          {shiftTypes.map((type) => (
            <span
              key={type}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${shiftStyles[type]}`}
            >
              {shiftLabels[type]}: {counts[type]}
            </span>
          ))}
        </div>
      </div>

      {/* Staff list */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-50">
          {filteredStaff.map((staff) => {
            const currentShift = shiftData[staff.id]?.[dayIndex];

            return (
              <div key={staff.id} className="px-4 py-2.5 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
                      {staff.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{staff.name}</div>
                      <div className="text-[10px] text-gray-400">{staff.jobType} / {staff.position}</div>
                    </div>
                  </div>
                </div>

                {/* Shift type buttons */}
                <div className="flex gap-1 ml-9">
                  {shiftTypes.map((type) => {
                    const isActive = currentShift === type;
                    return (
                      <button
                        key={type}
                        onClick={() => onShiftChange(staff.id, dayIndex, type)}
                        className={`w-8 h-7 flex items-center justify-center text-[10px] font-bold rounded transition-all ${
                          isActive
                            ? `${shiftStyles[type]} ring-1 ring-offset-1 ring-current scale-105`
                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
