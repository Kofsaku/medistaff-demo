'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Staff } from '@/types';
import { staffList as initialStaffList } from '@/data/mockData';

interface StaffContextType {
  staffList: Staff[];
  addStaff: (staff: Staff) => void;
}

const StaffContext = createContext<StaffContextType | null>(null);

export function StaffProvider({ children }: { children: ReactNode }) {
  const [staffList, setStaffList] = useState<Staff[]>(initialStaffList);

  const addStaff = useCallback((staff: Staff) => {
    setStaffList((prev) => [staff, ...prev]);
  }, []);

  return (
    <StaffContext.Provider value={{ staffList, addStaff }}>
      {children}
    </StaffContext.Provider>
  );
}

export function useStaff() {
  const ctx = useContext(StaffContext);
  if (!ctx) throw new Error('useStaff must be used within StaffProvider');
  return ctx;
}
