'use client';

import { useState, useMemo } from 'react';
import { staffList } from '@/data/mockData';
import StaffFilters from '@/components/staff/StaffFilters';
import StaffTable from '@/components/staff/StaffTable';
import StaffDetail from '@/components/staff/StaffDetail';
import StaffCreateModal from '@/components/staff/StaffCreateModal';
import Toast from '@/components/ui/Toast';

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [detailStaffId, setDetailStaffId] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);

  const filteredStaff = useMemo(() => {
    let data = [...staffList];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q)
      );
    }
    if (department) {
      data = data.filter((s) => s.department === department);
    }
    if (jobType) {
      data = data.filter((s) => s.jobType === jobType);
    }
    if (employmentType) {
      data = data.filter((s) => s.employmentType === employmentType);
    }

    data.sort((a, b) => {
      const key = sortKey as keyof typeof a;
      const aVal = a[key] ?? '';
      const bVal = b[key] ?? '';
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [searchQuery, department, jobType, employmentType, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleDetailClick = (id: string) => {
    setDetailStaffId(id);
    setDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">職員管理</h1>
      <StaffFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        department={department}
        onDepartmentChange={setDepartment}
        jobType={jobType}
        onJobTypeChange={setJobType}
        employmentType={employmentType}
        onEmploymentTypeChange={setEmploymentType}
        onCreateClick={() => setCreateOpen(true)}
      />
      <StaffTable
        staffData={filteredStaff}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        onDetailClick={handleDetailClick}
      />
      <StaffDetail
        staffId={detailStaffId}
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
      <StaffCreateModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={() => setToastVisible(true)}
      />
      <Toast
        message="職員情報を登録しました"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
