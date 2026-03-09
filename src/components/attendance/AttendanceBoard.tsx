'use client';

import { useState } from 'react';
import { UserCheck, UserX, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}/${m}/${d}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function AttendanceBoard() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  const goToPrevDay = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      return d;
    });
  };

  const goToNextDay = () => {
    setCurrentDate((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      return d;
    });
  };

  const isToday = isSameDay(currentDate, today);

  const prevDate = new Date(currentDate);
  prevDate.setDate(prevDate.getDate() - 1);
  const nextDate = new Date(currentDate);
  nextDate.setDate(nextDate.getDate() + 1);

  const kpiCards = [
    {
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      iconBg: 'bg-green-100',
      label: '出勤済',
      value: '142名',
      subInfo: '全体の76.3%',
    },
    {
      icon: <UserX className="w-6 h-6 text-amber-600" />,
      iconBg: 'bg-amber-100',
      label: '未出勤',
      value: '44名',
      subInfo: 'うち休暇12名、未打刻32名',
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      iconBg: 'bg-red-100',
      label: '遅刻',
      value: '3名',
      subInfo: '09:00基準',
    },
  ];

  return (
    <div>
      {/* Date Switcher */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          onClick={goToPrevDay}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="前日"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <span className="text-sm text-gray-500">{formatDate(prevDate)}</span>
        <span className="mx-2 text-gray-300">|</span>
        <span
          className={`text-sm font-semibold ${
            isToday ? 'text-blue-600' : 'text-gray-900'
          }`}
        >
          {formatDate(currentDate)}
          {isToday && '（今日）'}
        </span>
        <span className="mx-2 text-gray-300">|</span>
        <span className="text-sm text-gray-500">{formatDate(nextDate)}</span>
        <button
          onClick={goToNextDay}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="翌日"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-3 gap-6">
        {kpiCards.map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-4">
              <div className={`${card.iconBg} rounded-full p-3`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm text-[#64748B]">{card.label}</p>
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-[#64748B]">{card.subInfo}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
