"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const pathLabels: Record<string, string> = {
  "/": "ダッシュボード",
  "/staff": "職員管理",
  "/shift": "シフト管理",
  "/attendance": "勤怠管理",
  "/leave": "休暇申請",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  const currentLabel = pathLabels[pathname] ?? pathname;
  const isHome = pathname === "/";

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
