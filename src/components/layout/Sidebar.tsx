"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  FileText,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onSettingsClick: () => void;
}

const menuItems: { icon: React.ComponentType<{ className?: string }>; label: string; href: string; badge?: number }[] = [
  { icon: LayoutDashboard, label: "ダッシュボード", href: "/" },
  { icon: Users, label: "職員管理", href: "/staff" },
  { icon: Calendar, label: "シフト管理", href: "/shift" },
  { icon: Clock, label: "勤怠管理", href: "/attendance" },
  { icon: FileText, label: "休暇申請", href: "/leave", badge: 2 },
];

export default function Sidebar({ onSettingsClick }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#F8FAFC] border-r border-[#E2E8F0] flex flex-col z-20">
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-2.5 mx-2 rounded-md text-sm font-medium text-gray-600",
                    "transition-all duration-200 ease-in-out",
                    "hover:bg-gray-100 hover:text-gray-900",
                    isActive &&
                      "bg-blue-50 text-blue-700 border-l-3 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-semibold text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}

          {/* Settings item - uses onClick instead of navigation */}
          <li>
            <button
              onClick={onSettingsClick}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 mx-2 rounded-md text-sm font-medium text-gray-600",
                "transition-all duration-200 ease-in-out",
                "hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Settings className="h-5 w-5 shrink-0" />
              <span className="flex-1 text-left">設定</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
