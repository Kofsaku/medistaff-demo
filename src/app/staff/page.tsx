'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useStaff } from '@/lib/StaffContext';
import StaffFilters from '@/components/staff/StaffFilters';
import StaffTable from '@/components/staff/StaffTable';

export default function StaffPage() {
  const router = useRouter();
  const { staffList } = useStaff();
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [sortKey, setSortKey] = useState('id');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filteredStaff = useMemo(() => {
    let data = [...staffList];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.nameKana.toLowerCase().includes(q)
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
  }, [staffList, searchQuery, department, jobType, employmentType, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleDetailClick = (id: string) => {
    router.push(`/staff/${id}`);
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
        onCreateClick={() => router.push('/staff/new')}
      />
      <StaffTable
        staffData={filteredStaff}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
        onDetailClick={handleDetailClick}
      />
    </div>
  );
}
