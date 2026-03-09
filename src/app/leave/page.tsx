'use client';

import { useState, useMemo } from 'react';
import { leaveRequests as initialLeaveRequests } from '@/data/mockData';
import { LeaveRequest } from '@/types';
import LeaveSummary from '@/components/leave/LeaveSummary';
import LeaveTable from '@/components/leave/LeaveTable';
import ApprovalDialog from '@/components/leave/ApprovalDialog';
import Toast from '@/components/ui/Toast';

export default function LeavePage() {
  const [leaveData, setLeaveData] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'approve' | 'reject'>('approve');
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const pendingCount = useMemo(
    () => leaveData.filter((l) => l.status === '承認待ち').length,
    [leaveData]
  );

  const handleApprove = (id: string) => {
    const leave = leaveData.find((l) => l.id === id);
    if (leave) {
      setSelectedLeave(leave);
      setDialogMode('approve');
      setDialogOpen(true);
    }
  };

  const handleReject = (id: string) => {
    const leave = leaveData.find((l) => l.id === id);
    if (leave) {
      setSelectedLeave(leave);
      setDialogMode('reject');
      setDialogOpen(true);
    }
  };

  const handleConfirm = () => {
    if (!selectedLeave) return;
    setLeaveData((prev) =>
      prev.map((l) =>
        l.id === selectedLeave.id
          ? { ...l, status: dialogMode === 'approve' ? '承認済' as const : '却下' as const }
          : l
      )
    );
    setDialogOpen(false);
    setToastMessage(
      dialogMode === 'approve'
        ? '休暇申請を承認しました'
        : '休暇申請を却下しました'
    );
    setToastVisible(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">休暇申請</h1>
      <LeaveSummary pendingCount={pendingCount} monthlyLeaveCount={8} />
      <LeaveTable
        leaveData={leaveData}
        onApprove={handleApprove}
        onReject={handleReject}
      />
      <ApprovalDialog
        isOpen={dialogOpen}
        mode={dialogMode}
        leaveRequest={selectedLeave}
        onConfirm={handleConfirm}
        onClose={() => setDialogOpen(false)}
      />
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
