'use client';

import { LeaveRequest } from '@/types';

interface LeaveTableProps {
  leaveData: LeaveRequest[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

function getLeaveTypeBadge(leaveType: LeaveRequest['leaveType']) {
  const styles: Record<LeaveRequest['leaveType'], string> = {
    '有給休暇': 'bg-blue-100 text-blue-800',
    '特別休暇': 'bg-purple-100 text-purple-800',
    '慶弔休暇': 'bg-green-100 text-green-800',
    '病気休暇': 'bg-red-100 text-red-800',
  };
  return styles[leaveType];
}

function getStatusBadge(status: LeaveRequest['status']) {
  const styles: Record<LeaveRequest['status'], string> = {
    '承認待ち': 'bg-amber-100 text-amber-800',
    '承認済': 'bg-green-100 text-green-800',
    '却下': 'bg-red-100 text-red-800',
  };
  return styles[status];
}

export default function LeaveTable({ leaveData, onApprove, onReject }: LeaveTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full" style={{ minWidth: 850 }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">申請番号</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">申請者</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">部門</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">休暇種別</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">期間</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">申請日</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">ステータス</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-[#64748B]">操作</th>
            </tr>
          </thead>
          <tbody>
            {leaveData.map((leave, index) => (
              <tr
                key={leave.id}
                className={`border-b border-gray-100 hover:bg-blue-50 transition-colors duration-150 ${
                  index % 2 === 1 ? 'bg-gray-50' : ''
                }`}
              >
                <td className="px-4 py-3 text-sm font-mono">{leave.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#0F6FDE] text-white text-xs flex items-center justify-center font-medium">
                      {leave.staffName.charAt(0)}
                    </div>
                    <span className="text-sm">{leave.staffName}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm">{leave.department}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getLeaveTypeBadge(
                      leave.leaveType
                    )}`}
                  >
                    {leave.leaveType}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  {leave.startDate} 〜 {leave.endDate}（{leave.days}日間）
                </td>
                <td className="px-4 py-3 text-sm">{leave.applicationDate}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                      leave.status
                    )}`}
                  >
                    {leave.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {leave.status === '承認待ち' ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApprove(leave.id)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        承認
                      </button>
                      <button
                        onClick={() => onReject(leave.id)}
                        className="px-3 py-1.5 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                      >
                        却下
                      </button>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
