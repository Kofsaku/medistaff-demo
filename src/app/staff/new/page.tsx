'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { departments, jobTypes, employmentTypes } from '@/data/mockData';
import { useStaff } from '@/lib/StaffContext';
import Toast from '@/components/ui/Toast';

interface FormData {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  department: string;
  jobType: string;
  employmentType: string;
  joinDate: string;
  position: string;
}

interface FormErrors {
  lastName?: string;
  firstName?: string;
  department?: string;
  jobType?: string;
  employmentType?: string;
  email?: string;
}

export default function StaffNewPage() {
  const router = useRouter();
  const { staffList, addStaff } = useStaff();
  const [toastVisible, setToastVisible] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    birthDate: '',
    gender: '男性',
    phone: '',
    email: '',
    address: '',
    department: '',
    jobType: '',
    employmentType: '',
    joinDate: '',
    position: '一般',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.lastName.trim()) newErrors.lastName = '姓を入力してください';
    if (!formData.firstName.trim()) newErrors.firstName = '名を入力してください';
    if (!formData.department) newErrors.department = '部門を選択してください';
    if (!formData.jobType) newErrors.jobType = '職種を選択してください';
    if (!formData.employmentType) newErrors.employmentType = '雇用形態を選択してください';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newId = `EMP-${String(staffList.length + 1).padStart(3, '0')}`;
    addStaff({
      id: newId,
      name: `${formData.lastName}${formData.firstName}`,
      nameKana: `${formData.lastNameKana} ${formData.firstNameKana}`,
      department: formData.department,
      jobType: formData.jobType,
      employmentType: formData.employmentType as '常勤' | '非常勤' | 'パート',
      joinDate: formData.joinDate ? formData.joinDate.replace(/-/g, '/') : '2026/03/01',
      status: '出勤',
      birthDate: formData.birthDate ? formData.birthDate.replace(/-/g, '/') : '1990/01/01',
      gender: (formData.gender || '男性') as '男性' | '女性' | 'その他',
      phone: formData.phone || '未設定',
      email: formData.email || `${newId.toLowerCase()}@hospital.example.jp`,
      address: formData.address || '未設定',
      position: formData.position || '一般',
    });

    setToastVisible(true);
    setTimeout(() => {
      router.push('/staff');
    }, 1200);
  };

  const inputClass =
    'border border-[#E2E8F0] rounded-lg px-3 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6FDE]/30 focus:border-[#0F6FDE] transition-all';
  const labelClass = 'text-sm font-medium text-[#1E293B] mb-1.5 block';
  const errorClass = 'text-xs text-red-500 mt-1';

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold">新規職員登録</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Section: Basic Info */}
          <div className="px-6 py-4 border-b border-[#E2E8F0] bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">基本情報</h2>
          </div>
          <div className="px-6 py-5 space-y-4">
            {/* 氏名 */}
            <div>
              <label className={labelClass}>
                氏名 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="姓"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className={inputClass}
                    autoFocus
                  />
                  {errors.lastName && <p className={errorClass}>{errors.lastName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="名"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className={inputClass}
                  />
                  {errors.firstName && <p className={errorClass}>{errors.firstName}</p>}
                </div>
              </div>
            </div>

            {/* 氏名かな */}
            <div>
              <label className={labelClass}>氏名かな</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="せい"
                  value={formData.lastNameKana}
                  onChange={(e) => handleChange('lastNameKana', e.target.value)}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="めい"
                  value={formData.firstNameKana}
                  onChange={(e) => handleChange('firstNameKana', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* 生年月日・性別 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>生年月日</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleChange('birthDate', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>性別</label>
                <div className="flex items-center gap-6 mt-2">
                  {['男性', '女性', 'その他'].map((g) => (
                    <label key={g} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={formData.gender === g}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="accent-[#0F6FDE]"
                      />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: Contact */}
          <div className="px-6 py-4 border-b border-t border-[#E2E8F0] bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">連絡先</h2>
          </div>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>電話番号</label>
                <input
                  type="tel"
                  placeholder="090-1234-5678"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>メールアドレス</label>
                <input
                  type="email"
                  placeholder="example@hospital.example.jp"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClass}
                />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>
            </div>
            <div>
              <label className={labelClass}>住所</label>
              <input
                type="text"
                placeholder="東京都..."
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Section: Employment */}
          <div className="px-6 py-4 border-b border-t border-[#E2E8F0] bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-700">勤務情報</h2>
          </div>
          <div className="px-6 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>
                  部門 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  className={inputClass}
                >
                  <option value="">選択してください</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {errors.department && <p className={errorClass}>{errors.department}</p>}
              </div>
              <div>
                <label className={labelClass}>
                  職種 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.jobType}
                  onChange={(e) => handleChange('jobType', e.target.value)}
                  className={inputClass}
                >
                  <option value="">選択してください</option>
                  {jobTypes.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
                {errors.jobType && <p className={errorClass}>{errors.jobType}</p>}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className={labelClass}>
                  雇用形態 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) => handleChange('employmentType', e.target.value)}
                  className={inputClass}
                >
                  <option value="">選択してください</option>
                  {employmentTypes.map((e) => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
                {errors.employmentType && <p className={errorClass}>{errors.employmentType}</p>}
              </div>
              <div>
                <label className={labelClass}>役職</label>
                <select
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  className={inputClass}
                >
                  {['一般', '主任', '師長', '科長', '部長', '副部長', '医員'].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>入職日</label>
                <input
                  type="date"
                  value={formData.joinDate}
                  onChange={(e) => handleChange('joinDate', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2E8F0] bg-gray-50">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#0F6FDE] rounded-lg hover:bg-[#0B5BBF] transition-colors"
            >
              登録する
            </button>
          </div>
        </form>
      </div>

      <Toast
        message="職員情報を登録しました"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
}
