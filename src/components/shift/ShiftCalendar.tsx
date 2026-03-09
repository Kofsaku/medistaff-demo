'use client';

import { useState, useRef, useEffect } from 'react';
import { staffList } from '@/data/mockData';
import { ShiftType } from '@/types';

interface ShiftCalendarProps {
  shiftData: Record<string, ShiftType[]>;
  onShiftChange: (staffId: string, dayIndex: number, type: ShiftType) => void;
  viewMode: string;
  weekOffset: number;
}

const shiftStyles: Record<ShiftType, string> = {
  '日': 'bg-blue-100 text-blue-700',
  '夜': 'bg-purple-100 text-purple-700',
  '準': 'bg-indigo-100 text-indigo-700',
  '休': 'bg-gray-100 text-gray-400',
  '有': 'bg-amber-100 text-amber-700',
  '当': 'bg-red-100 text-red-700',
};

const shiftTypes: ShiftType[] = ['日', '夜', '準', '休', '有', '当'];

const DAYS_IN_MARCH = 31;

function getDayOfWeekClass(day: number): string {
  const dow = new Date(2026, 2, day).getDay();
  if (dow === 6) return 'text-blue-600';
  if (dow === 0) return 'text-red-600';
  return '';
}

export default function ShiftCalendar({ shiftData, onShiftChange, viewMode, weekOffset }: ShiftCalendarProps) {
  const [popover, setPopover] = useState<{
    staffId: string;
    dayIndex: number;
    x: number;
    y: number;
  } | null>(null);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopover(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleCellClick(
    staffId: string,
    dayIndex: number,
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    setPopover({
      staffId,
      dayIndex,
      x: Math.min(rect.left, window.innerWidth - 220),
      y: rect.bottom + 4,
    });
  }

  function handleShiftSelect(type: ShiftType) {
    if (popover) {
      onShiftChange(popover.staffId, popover.dayIndex, type);
      setPopover(null);
    }
  }

  function getDaySummary(dayIndex: number): { day: number; night: number } {
    let day = 0;
    let night = 0;
    staffList.forEach((staff) => {
      const shifts = shiftData[staff.id];
      if (shifts && shifts[dayIndex]) {
        if (shifts[dayIndex] === '日') day++;
        if (shifts[dayIndex] === '夜') night++;
      }
    });
    return { day, night };
  }

  // Compute visible day indices based on view mode
  const visibleDays: number[] = [];
  if (viewMode === '週表示') {
    // Each week offset shows 7 days: offset 0 = day 1-7, offset 1 = day 8-14, etc.
    const startDay = weekOffset * 7;
    for (let i = startDay; i < Math.min(startDay + 7, DAYS_IN_MARCH); i++) {
      visibleDays.push(i);
    }
  } else {
    for (let i = 0; i < DAYS_IN_MARCH; i++) {
      visibleDays.push(i);
    }
  }

  const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];

  return (
    <div className="relative bg-white rounded-lg shadow-sm">
      <div className="overflow-x-auto">
        <table className="border-collapse text-xs w-full">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 min-w-[100px] px-2 py-2 text-left border-b border-r border-[#E2E8F0] font-medium text-gray-700 text-xs">
                スタッフ
              </th>
              {visibleDays.map((dayIndex) => {
                const day = dayIndex + 1;
                const dow = new Date(2026, 2, day).getDay();
                return (
                  <th
                    key={dayIndex}
                    className={`px-0 py-2 border-b border-[#E2E8F0] text-center font-medium text-xs ${viewMode === '週表示' ? 'w-16' : 'w-9'} ${getDayOfWeekClass(day)}`}
                  >
                    <div>{day}</div>
                    {viewMode === '週表示' && (
                      <div className="text-[10px] font-normal text-gray-400">{dayLabels[dow]}</div>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {staffList.map((staff) => (
              <tr key={staff.id} className="hover:bg-gray-50/50">
                <td className="sticky left-0 z-10 bg-white min-w-[100px] px-2 py-1 border-b border-r border-[#E2E8F0] text-xs font-medium text-gray-800 whitespace-nowrap">
                  {staff.name}
                </td>
                {visibleDays.map((dayIndex) => {
                  const shift = shiftData[staff.id]?.[dayIndex];
                  return (
                    <td key={dayIndex} className="px-0.5 py-0.5 border-b border-[#E2E8F0] text-center">
                      <div
                        onClick={(e) => handleCellClick(staff.id, dayIndex, e)}
                        className={`${viewMode === '週表示' ? 'w-12 h-8' : 'w-8 h-7'} flex items-center justify-center text-[10px] font-medium rounded cursor-pointer mx-auto ${
                          shift ? shiftStyles[shift] : 'bg-gray-50'
                        }`}
                      >
                        {shift || ''}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Summary row */}
            <tr>
              <td className="sticky left-0 z-10 bg-gray-50 min-w-[100px] px-2 py-1 border-t border-r border-[#E2E8F0] font-medium text-gray-600 text-xs">
                合計
              </td>
              {visibleDays.map((dayIndex) => {
                const summary = getDaySummary(dayIndex);
                return (
                  <td
                    key={dayIndex}
                    className="px-0.5 py-1 border-t border-[#E2E8F0] text-center text-[10px] text-gray-500"
                  >
                    <div>日:{summary.day}</div>
                    <div>夜:{summary.night}</div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Popover for shift selection */}
      {popover && (
        <div
          ref={popoverRef}
          className="fixed z-50 bg-white border border-[#E2E8F0] rounded-lg shadow-lg p-1.5 flex gap-1"
          style={{ left: popover.x, top: popover.y }}
        >
          {shiftTypes.map((type) => (
            <button
              key={type}
              onClick={() => handleShiftSelect(type)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded ${shiftStyles[type]} hover:opacity-80 transition-opacity`}
            >
              {type}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
