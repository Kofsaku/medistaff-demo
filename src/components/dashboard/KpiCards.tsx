'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Users, UserCheck, CalendarX2, TriangleAlert, ArrowUp } from 'lucide-react';
import { staffList } from '@/data/mockData';

interface KpiCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  targetValue: number;
  suffix: string;
  subInfo: React.ReactNode;
}

function useCountUp(target: number, duration: number = 800) {
  const [value, setValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    },
    [target, duration]
  );

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return value;
}

function KpiCard({ icon, iconBg, label, targetValue, suffix, subInfo }: KpiCardProps) {
  const animatedValue = useCountUp(targetValue);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-4 xl:p-6 min-w-0">
      <div className="flex items-center gap-3">
        <div className={`${iconBg} rounded-full p-2.5 shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-xs xl:text-sm text-[#64748B] truncate">{label}</p>
          <p className="text-xl xl:text-2xl font-bold">
            {animatedValue}
            {suffix}
          </p>
          <div className="text-xs xl:text-sm text-[#64748B]">{subInfo}</div>
        </div>
      </div>
    </div>
  );
}

export default function KpiCards() {
  const totalStaff = staffList.length;
  const activeStaff = staffList.filter((s) => s.status === '出勤').length;
  const onLeave = staffList.filter((s) => s.status === '休暇').length;
  const attendanceRate = Math.round((activeStaff / totalStaff) * 100 * 10) / 10;

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
      <KpiCard
        icon={<Users className="w-5 h-5 text-blue-600" />}
        iconBg="bg-blue-100"
        label="総職員数"
        targetValue={totalStaff}
        suffix="名"
        subInfo={
          <span className="flex items-center gap-1">
            前月比{' '}
            <span className="text-green-600 flex items-center">
              <ArrowUp className="w-3 h-3" />
              +2
            </span>
          </span>
        }
      />
      <KpiCard
        icon={<UserCheck className="w-5 h-5 text-green-600" />}
        iconBg="bg-green-100"
        label="本日出勤"
        targetValue={activeStaff}
        suffix="名"
        subInfo={<span>出勤率 {attendanceRate}%</span>}
      />
      <KpiCard
        icon={<CalendarX2 className="w-5 h-5 text-amber-600" />}
        iconBg="bg-amber-100"
        label="休暇中"
        targetValue={onLeave}
        suffix="名"
        subInfo={<span>有休: {Math.max(onLeave - 1, 0)} / 特休: {Math.min(onLeave, 1)}</span>}
      />
      <KpiCard
        icon={<TriangleAlert className="w-5 h-5 text-red-600" />}
        iconBg="bg-red-100"
        label="残業アラート"
        targetValue={4}
        suffix="名"
        subInfo={<span>週40時間超過</span>}
      />
    </div>
  );
}
