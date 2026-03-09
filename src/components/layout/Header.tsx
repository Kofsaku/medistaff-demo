"use client";

import { Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onNotificationClick: () => void;
}

export default function Header({ onNotificationClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold text-[#0F6FDE]">MediStaff</span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button
          onClick={onNotificationClick}
          className={cn(
            "relative rounded-full p-2 text-gray-500",
            "transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700"
          )}
          aria-label="通知"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            3
          </span>
        </button>

        {/* User info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
            山田
          </div>

          {/* Name and role */}
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium text-gray-900">
              山田 太郎
            </span>
            <span className="text-xs text-gray-500">システム管理者</span>
          </div>
        </div>
      </div>
    </header>
  );
}
