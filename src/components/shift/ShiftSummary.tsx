'use client';

import { ShiftType, Staff } from '@/types';

interface ShiftSummaryProps {
  shiftData: Record<string, ShiftType[]>;
  filteredStaff: Staff[];
  year: number;
  month: number;
  department: string;
}

const shiftLabels: { type: ShiftType; label: string; color: string }[] = [
  { type: '日', label: '日勤', color: 'bg-blue-500' },
  { type: '夜', label: '夜勤', color: 'bg-purple-500' },
  { type: '準', label: '準夜勤', color: 'bg-indigo-500' },
  { type: '当', label: '当直', color: 'bg-red-500' },
  { type: '有', label: '有休', color: 'bg-amber-500' },
  { type: '休', label: '休日', color: 'bg-gray-400' },
];

export default function ShiftSummary({ shiftData, filteredStaff, year, month, department }: ShiftSummaryProps) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Count totals for filtered staff
  const counts: Record<ShiftType, number> = { '日': 0, '夜': 0, '準': 0, '休': 0, '有': 0, '当': 0 };
  filteredStaff.forEach((staff) => {
    const shifts = shiftData[staff.id];
    if (shifts) {
      shifts.forEach((shift) => {
        counts[shift]++;
      });
    }
  });

  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  // Find understaffed days (days where night shift < 2 for departments with nurses)
  const shortages: string[] = [];
  const dayLabels = ['日', '月', '火', '水', '木', '金', '土'];
  const nurseStaff = filteredStaff.filter((s) => s.jobType === '看護師');

  if (nurseStaff.length >= 2) {
    for (let d = 0; d < daysInMonth; d++) {
      let nightCount = 0;
      nurseStaff.forEach((staff) => {
        const shift = shiftData[staff.id]?.[d];
        if (shift === '夜') nightCount++;
      });
      if (nightCount === 0 && nurseStaff.length >= 3) {
        const date = new Date(year, month, d + 1);
        const dow = dayLabels[date.getDay()];
        shortages.push(`${month + 1}/${d + 1}(${dow}) 夜勤 0名`);
      }
    }
  }

  // Per-staff monthly stats
  const staffStats = filteredStaff.map((staff) => {
    const shifts = shiftData[staff.id] || [];
    const sc: Record<ShiftType, number> = { '日': 0, '夜': 0, '準': 0, '休': 0, '有': 0, '当': 0 };
    shifts.forEach((s) => sc[s]++);
    return { staff, counts: sc };
  });

  return (
    <div className="space-y-4">
      {/* Card 1: Stats */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">
          {department || '全部門'} - 今月の集計
        </h3>
        <div className="space-y-2">
          {shiftLabels.map(({ type, label, color }) => {
            const pct = total > 0 ? (counts[type] / total) * 100 : 0;
            return (
              <div key={type}>
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-xs text-gray-600">{label}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-700">{counts[type]}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs text-gray-500">
          <span>対象スタッフ</span>
          <span className="font-bold text-gray-700">{filteredStaff.length}名</span>
        </div>
      </div>

      {/* Card 2: Shortages */}
      {shortages.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-sm text-gray-800 mb-2">
            未充足日
            <span className="ml-1.5 bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full font-bold">{shortages.length}</span>
          </h3>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {shortages.slice(0, 8).map((entry, i) => (
              <p key={i} className="text-xs text-red-600 bg-red-50 rounded px-2 py-1">{entry}</p>
            ))}
            {shortages.length > 8 && (
              <p className="text-[10px] text-gray-400">他 {shortages.length - 8} 件</p>
            )}
          </div>
        </div>
      )}

      {/* Card 3: Staff breakdown */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold text-sm text-gray-800 mb-3">スタッフ別集計</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {staffStats.map(({ staff, counts: sc }) => (
            <div key={staff.id} className="flex items-center gap-2 text-xs">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-[9px] font-medium flex-shrink-0">
                {staff.name.charAt(0)}
              </div>
              <span className="text-gray-700 font-medium min-w-[60px] truncate">{staff.name}</span>
              <div className="flex gap-0.5 flex-1 justify-end">
                {(['日', '夜', '準', '当'] as ShiftType[]).map((type) => (
                  <span key={type} className="text-gray-500 min-w-[24px] text-center">
                    {sc[type] > 0 ? sc[type] : '-'}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {staffStats.length > 0 && (
          <div className="mt-2 pt-1.5 border-t border-gray-100 flex gap-0.5 text-[10px] text-gray-400 justify-end">
            {['日', '夜', '準', '当'].map((t) => (
              <span key={t} className="min-w-[24px] text-center">{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
