"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { staffList } from "@/data/mockData";

const pathLabels: Record<string, string> = {
  "/": "ダッシュボード",
  "/staff": "職員管理",
  "/shift": "シフト管理",
  "/attendance": "勤怠管理",
  "/leave": "休暇申請",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Handle /staff/new
  if (pathname === '/staff/new') {
    return (
      <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-sm">
        <Link href="/" className="text-[#64748B] transition-colors duration-200 hover:text-gray-900">ホーム</Link>
        <ChevronRight className="h-4 w-4 text-[#64748B] shrink-0" />
        <Link href="/staff" className="text-[#64748B] transition-colors duration-200 hover:text-gray-900">職員管理</Link>
        <ChevronRight className="h-4 w-4 text-[#64748B] shrink-0" />
        <span className="text-[#1E293B] font-medium">新規登録</span>
      </nav>
    );
  }

  // Handle /staff/[id] detail pages
  const staffDetailMatch = pathname.match(/^\/staff\/(.+)$/);
  if (staffDetailMatch) {
    const staffId = staffDetailMatch[1];
    const staff = staffList.find((s) => s.id === staffId);
    const staffName = staff ? staff.name : staffId;

    return (
      <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-sm">
        <Link href="/" className="text-[#64748B] transition-colors duration-200 hover:text-gray-900">ホーム</Link>
        <ChevronRight className="h-4 w-4 text-[#64748B] shrink-0" />
        <Link href="/staff" className="text-[#64748B] transition-colors duration-200 hover:text-gray-900">職員管理</Link>
        <ChevronRight className="h-4 w-4 text-[#64748B] shrink-0" />
        <span className="text-[#1E293B] font-medium">{staffName}</span>
      </nav>
    );
  }

  const currentLabel = pathLabels[pathname] ?? pathname;

  return (
    <nav aria-label="パンくずリスト" className="flex items-center gap-1 text-sm">
      {isHome ? (
        <span className="text-[#1E293B] font-medium">ダッシュボード</span>
      ) : (
        <>
          <Link
            href="/"
            className={cn(
              "text-[#64748B] transition-colors duration-200 hover:text-gray-900"
            )}
          >
            ホーム
          </Link>
          <ChevronRight className="h-4 w-4 text-[#64748B] shrink-0" />
          <span className="text-[#1E293B] font-medium">{currentLabel}</span>
        </>
      )}
    </nav>
  );
}
