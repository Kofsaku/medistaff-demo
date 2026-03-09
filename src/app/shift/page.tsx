'use client';

import { useState, useMemo, useCallback } from 'react';
import { generateShiftData, staffList } from '@/data/mockData';
import { ShiftType, Staff } from '@/types';
import ShiftControls from '@/components/shift/ShiftControls';
import ShiftCalendarGrid from '@/components/shift/ShiftCalendarGrid';
import ShiftDayDetail from '@/components/shift/ShiftDayDetail';
import ShiftSummary from '@/components/shift/ShiftSummary';

export default function ShiftPage() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March (0-indexed)
  const [department, setDepartment] = useState('内科病棟');
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Generate shift data memoized per month
  const [shiftDataCache, setShiftDataCache] = useState<Record<string, Record<string, ShiftType[]>>>(() => ({
    '2026-2': generateShiftData(2026, 2),
  }));

  const monthKey = `${year}-${month}`;
  const shiftData = useMemo(() => {
    if (!shiftDataCache[monthKey]) {
      const data = generateShiftData(year, month);
      setShiftDataCache((prev) => ({ ...prev, [monthKey]: data }));
      return data;
    }
    return shiftDataCache[monthKey];
  }, [monthKey, shiftDataCache, year, month]);

  // Filter staff by department
  const filteredStaff = useMemo(() => {
    if (!department) return staffList;
    return staffList.filter((s) => s.department === department);
  }, [department]);

  const handleMonthChange = useCallback((dir: number) => {
    setSelectedDate(null);
    setMonth((prev) => {
      let newMonth = prev + dir;
      let newYear = year;
      if (newMonth < 0) { newMonth = 11; newYear--; }
      if (newMonth > 11) { newMonth = 0; newYear++; }
      setYear(newYear);
      return newMonth;
    });
  }, [year]);

  const handleShiftChange = useCallback((staffId: string, dayIndex: number, type: ShiftType) => {
    setShiftDataCache((prev) => {
      const key = `${year}-${month}`;
      const current = prev[key] || {};
      return {
        ...prev,
        [key]: {
          ...current,
          [staffId]: [
            ...(current[staffId] || []).slice(0, dayIndex),
            type,
            ...(current[staffId] || []).slice(dayIndex + 1),
          ],
        },
      };
    });
  }, [year, month]);

  const handleDateSelect = useCallback((day: number) => {
    setSelectedDate((prev) => (prev === day ? null : day));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">シフト管理</h1>
        {selectedStaff && (
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-medium">
              {selectedStaff.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-blue-700">{selectedStaff.name}のスケジュール</span>
            <button
              onClick={() => setSelectedStaff(null)}
              className="ml-1 text-blue-400 hover:text-blue-600 text-xs"
            >
              解除
            </button>
          </div>
        )}
      </div>

      <ShiftControls
        year={year}
        month={month}
        onMonthChange={handleMonthChange}
        department={department}
        onDepartmentChange={setDepartment}
        selectedStaff={selectedStaff}
        onStaffSelect={setSelectedStaff}
        filteredStaff={filteredStaff}
      />

      <div className="flex gap-4">
        {/* Main calendar area */}
        <div className={`transition-all ${selectedDate ? 'flex-1 min-w-0' : 'w-full'}`}>
          <ShiftCalendarGrid
            year={year}
            month={month}
            shiftData={shiftData}
            filteredStaff={filteredStaff}
            selectedStaff={selectedStaff}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* Side panel: Day detail or Summary */}
        <div className={`flex-shrink-0 transition-all ${selectedDate ? 'w-80' : 'w-72'}`}>
          {selectedDate ? (
            <ShiftDayDetail
              year={year}
              month={month}
              day={selectedDate}
              filteredStaff={filteredStaff}
              shiftData={shiftData}
              onShiftChange={handleShiftChange}
              onClose={() => setSelectedDate(null)}
            />
          ) : (
            <ShiftSummary
              shiftData={shiftData}
              filteredStaff={filteredStaff}
              year={year}
              month={month}
              department={department}
            />
          )}
        </div>
      </div>
    </div>
  );
}
