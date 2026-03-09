"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const tabs = ["基本設定", "通知設定", "権限管理"] as const;
type Tab = (typeof tabs)[number];

const permissionData = [
  {
    role: "管理者",
    staffManagement: "✓",
    shiftEdit: "✓",
    attendanceView: "✓",
    leaveApproval: "✓",
    settingsEdit: "✓",
  },
  {
    role: "部門長",
    staffManagement: "閲覧",
    shiftEdit: "✓",
    attendanceView: "✓",
    leaveApproval: "✓",
    settingsEdit: "✗",
  },
  {
    role: "一般",
    staffManagement: "閲覧",
    shiftEdit: "✗",
    attendanceView: "自分のみ",
    leaveApproval: "申請のみ",
    settingsEdit: "✗",
  },
];

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>("基本設定");
  const [hospitalName, setHospitalName] = useState("徳洲会中央病院");
  const [workStartTime, setWorkStartTime] = useState("09:00");
  const [overtimeThreshold, setOvertimeThreshold] = useState(40);
  const [notifications, setNotifications] = useState({
    qualificationRemind: true,
    shiftRemind: true,
    overtimeAlert: true,
  });

  if (!isOpen) return null;

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden modal-enter" onClick={(e) => e.stopPropagation()}>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header with tabs */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <h2 className="text-xl font-semibold text-gray-900">設定</h2>
            </div>
            <div className="flex px-6 mt-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-12rem)]">
            {activeTab === "基本設定" && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    病院名
                  </label>
                  <input
                    type="text"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    勤務開始時間
                  </label>
                  <input
                    type="text"
                    value={workStartTime}
                    onChange={(e) => setWorkStartTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    残業アラート閾値
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={overtimeThreshold}
                      onChange={(e) =>
                        setOvertimeThreshold(Number(e.target.value))
                      }
                      className="w-24 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <span className="text-sm text-gray-500">時間/月</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "通知設定" && (
              <div className="space-y-4">
                {[
                  {
                    key: "qualificationRemind" as const,
                    label: "資格更新リマインド",
                  },
                  {
                    key: "shiftRemind" as const,
                    label: "シフト未確定リマインド",
                  },
                  {
                    key: "overtimeAlert" as const,
                    label: "残業超過通知",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                    <button
                      onClick={() => toggleNotification(item.key)}
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        notifications[item.key]
                          ? "bg-blue-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          notifications[item.key]
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "権限管理" && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-medium text-gray-700">
                        ロール
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-gray-700">
                        職員管理
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-gray-700">
                        シフト編集
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-gray-700">
                        勤怠閲覧
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-gray-700">
                        休暇承認
                      </th>
                      <th className="text-center py-2 px-3 font-medium text-gray-700">
                        設定変更
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissionData.map((row) => (
                      <tr
                        key={row.role}
                        className="border-b border-gray-100"
                      >
                        <td className="py-2 px-3 font-medium text-gray-900">
                          {row.role}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={
                              row.staffManagement === "✓"
                                ? "text-green-600"
                                : row.staffManagement === "✗"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }
                          >
                            {row.staffManagement}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={
                              row.shiftEdit === "✓"
                                ? "text-green-600"
                                : row.shiftEdit === "✗"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }
                          >
                            {row.shiftEdit}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={
                              row.attendanceView === "✓"
                                ? "text-green-600"
                                : row.attendanceView === "✗"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }
                          >
                            {row.attendanceView}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={
                              row.leaveApproval === "✓"
                                ? "text-green-600"
                                : row.leaveApproval === "✗"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }
                          >
                            {row.leaveApproval}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span
                            className={
                              row.settingsEdit === "✓"
                                ? "text-green-600"
                                : row.settingsEdit === "✗"
                                  ? "text-red-500"
                                  : "text-gray-500"
                            }
                          >
                            {row.settingsEdit}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={() => {
                onClose();
                // Brief visual feedback via a temporary toast-like effect
                const el = document.createElement('div');
                el.className = 'fixed bottom-6 right-6 z-[100] bg-green-600 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium animate-[fadeIn_0.2s_ease-out]';
                el.textContent = '設定を保存しました';
                document.body.appendChild(el);
                setTimeout(() => el.remove(), 2000);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
