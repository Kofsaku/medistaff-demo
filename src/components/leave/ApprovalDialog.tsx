'use client';

import { useState } from 'react';
import { LeaveRequest } from '@/types';

interface ApprovalDialogProps {
  isOpen: boolean;
  mode: 'approve' | 'reject';
  leaveRequest: LeaveRequest | null;
  onConfirm: () => void;
  onClose: () => void;
}

export default function ApprovalDialog({
  isOpen,
  mode,
  leaveRequest,
  onConfirm,
  onClose,
}: ApprovalDialogProps) {
  const [rejectReason, setRejectReason] = useState('');

  if (!isOpen || !leaveRequest) return null;

  const isApprove = mode === 'approve';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-[modal-enter_0.2s_ease-out]">
        <h2 className="text-lg font-bold mb-4">
          {isApprove ? '休暇申請の承認' : '休暇申請の却下'}
        </h2>

        <p className="text-sm text-gray-700 mb-4">
          {leaveRequest.staffName}さんの休暇申請を{isApprove ? '承認' : '却下'}しますか？
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-[#64748B]">休暇種別</span>
            <span className="font-medium">{leaveRequest.leaveType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#64748B]">期間</span>
            <span className="font-medium">
              {leaveRequest.startDate} 〜 {leaveRequest.endDate}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#64748B]">日数</span>
            <span className="font-medium">{leaveRequest.days}日間</span>
          </div>
        </div>

        {!isApprove && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">却下理由</label>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="却下理由を入力してください"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          {isApprove ? (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              承認する
            </button>
          ) : (
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              却下する
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
