export interface Staff {
  id: string;
  name: string;
  nameKana: string;
  department: string;
  jobType: string;
  employmentType: '常勤' | '非常勤' | 'パート';
  joinDate: string;
  status: '出勤' | '休暇' | '退職';
  birthDate: string;
  gender: '男性' | '女性' | 'その他';
  phone: string;
  email: string;
  address: string;
  position: string;
}

export interface Qualification {
  name: string;
  acquiredDate: string;
  expiryDate: string | null;
  status: '有効' | '更新予定' | '期限切れ';
}

export interface AttendanceRecord {
  staffId: string;
  name: string;
  department: string;
  clockIn: string | null;
  clockOut: string | null;
  workHours: string | null;
  overtime: string | null;
  status: '出勤中' | '退勤済' | '遅刻' | '未打刻';
}

export interface MonthlyAttendance {
  staffId: string;
  name: string;
  workDays: number;
  absent: number;
  late: number;
  earlyLeave: number;
  overtime: number;
  paidLeave: number;
}

export interface LeaveRequest {
  id: string;
  staffName: string;
  department: string;
  leaveType: '有給休暇' | '特別休暇' | '慶弔休暇' | '病気休暇';
  startDate: string;
  endDate: string;
  days: number;
  applicationDate: string;
  status: '承認待ち' | '承認済' | '却下';
}

export type ShiftType = '日' | '夜' | '準' | '休' | '有' | '当';

export interface Notification {
  id: number;
  message: string;
  time: string;
}

export interface DepartmentData {
  name: string;
  count: number;
}

export interface JobTypeData {
  name: string;
  count: number;
  color: string;
}

export interface Activity {
  time: string;
  message: string;
}

export interface ShiftCoverage {
  department: string;
  rate: number;
}
