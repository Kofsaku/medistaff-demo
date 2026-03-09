'use client';

import { Staff } from '@/types';
import { ShiftType } from '@/types';

interface ShiftCalendarGridProps {
  year: number;
  month: number; // 0-indexed
  shiftData: Record<string, ShiftType[]>;
  filteredStaff: Staff[];
  selectedStaff: Staff | null;
  selectedDate: number | null;
  onDateSelect: (day: number) => void;
}

const shiftColors: Record<ShiftType, { bg: string; text: string }> = {
  '日': { bg: 'bg-blue-100', text: 'text-blue-700' },
  '夜': { bg: 'bg-purple-100', text: 'text-purple-700' },
  '準': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  '休': { bg: 'bg-gray-100', text: 'text-gray-400' },
  '有': { bg: 'bg-amber-100', text: 'text-amber-700' },
  '当': { bg: 'bg-red-100', text: 'text-red-700' },
};

const shiftLabelsMap: Record<ShiftType, string> = {
  '日': '日勤',
  '夜': '夜勤',
  '準': '準夜',
  '休': '休日',
  '有': '有休',
  '当': '当直',
};

const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

export default function ShiftCalendarGrid({
  year,
  month,
  shiftData,
  filteredStaff,
  selectedStaff,
  selectedDate,
  onDateSelect,
}: ShiftCalendarGridProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Build calendar weeks
  const weeks: (number | null)[][] = [];
  let currentWeek: (number | null)[] = [];

  // Fill leading empty cells
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    currentWeek.push(d);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Fill trailing empty cells
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  // Get summary for a given day (department view)
  function getDaySummary(day: number) {
    const dayIndex = day - 1;
    const counts: Record<ShiftType, number> = { '日': 0, '夜': 0, '準': 0, '休': 0, '有': 0, '当': 0 };
    let total = 0;
    filteredStaff.forEach((staff) => {
      const shift = shiftData[staff.id]?.[dayIndex];
      if (shift) {
        counts[shift]++;
        total++;
      }
    });
    return { counts, total };
  }

  // Get individual shift for a day (staff view)
  function getStaffShift(day: number): ShiftType | null {
    if (!selectedStaff) return null;
    return shiftData[selectedStaff.id]?.[day - 1] || null;
  }

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayLabels.map((label, i) => (
          <div
            key={label}
            className={`py-3 text-center text-sm font-semibold ${
              i === 0 ? 'text-red-500' : i === 6 ? 'text-blue-500' : 'text-gray-600'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="divide-y divide-gray-100">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 divide-x divide-gray-100">
            {week.map((day, di) => {
              if (day === null) {
                return <div key={`empty-${di}`} className="min-h-[110px] bg-gray-50/50" />;
              }

              const dow = new Date(year, month, day).getDay();
              const isToday = isCurrentMonth && today.getDate() === day;
              const isSelected = selectedDate === day;

              return (
                <div
                  key={day}
                  onClick={() => onDateSelect(day)}
                  className={`min-h-[110px] p-1.5 cursor-pointer transition-all hover:bg-blue-50/50 ${
                    isSelected ? 'bg-blue-50 ring-2 ring-blue-400 ring-inset' : ''
                  }`}
                >
                  {/* Date number */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium leading-none ${
                        isToday
                          ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                          : dow === 0
                          ? 'text-red-500'
                          : dow === 6
                          ? 'text-blue-500'
                          : 'text-gray-700'
                      }`}
                    >
                      {day}
                    </span>
                  </div>

                  {/* Content */}
                  {selectedStaff ? (
                    // Individual staff view
                    <StaffDayCell shift={getStaffShift(day)} />
                  ) : (
                    // Department summary view
                    <DepartmentDayCell summary={getDaySummary(day)} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function StaffDayCell({ shift }: { shift: ShiftType | null }) {
  if (!shift) return null;
  const colors = shiftColors[shift];
  return (
    <div className={`mt-0.5 rounded-md px-2 py-1.5 ${colors.bg}`}>
      <span className={`text-xs font-bold ${colors.text}`}>{shiftLabelsMap[shift]}</span>
    </div>
  );
}

function DepartmentDayCell({ summary }: { summary: { counts: Record<ShiftType, number>; total: number } }) {
  const { counts } = summary;
  // Only show shift types that have > 0 count
  const active: { type: ShiftType; count: number }[] = [];
  const displayOrder: ShiftType[] = ['日', '夜', '準', '当', '有', '休'];
  displayOrder.forEach((type) => {
    if (counts[type] > 0) {
      active.push({ type, count: counts[type] });
    }
  });

  if (active.length === 0) return null;

  return (
    <div className="space-y-0.5">
      {active.slice(0, 4).map(({ type, count }) => {
        const colors = shiftColors[type];
        return (
          <div key={type} className={`flex items-center justify-between rounded px-1 py-0.5 ${colors.bg}`}>
            <span className={`text-[10px] font-medium ${colors.text}`}>{type}</span>
            <span className={`text-[10px] font-bold ${colors.text}`}>{count}</span>
          </div>
        );
      })}
      {active.length > 4 && (
        <div className="text-[9px] text-gray-400 text-center">+{active.length - 4}</div>
      )}
    </div>
  );
}
