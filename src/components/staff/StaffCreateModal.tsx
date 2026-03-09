'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { departments, jobTypes, employmentTypes } from '@/data/mockData';

interface StaffCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface FormData {
  lastName: string;
  firstName: string;
  lastNameKana: string;
  firstNameKana: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  department: string;
  jobType: string;
  employmentType: string;
  joinDate: string;
}

interface FormErrors {
  lastName?: string;
  firstName?: string;
  department?: string;
  jobType?: string;
  employmentType?: string;
}

export default function StaffCreateModal({ isOpen, onClose, onSuccess }: StaffCreateModalProps) {
  const [formData, setFormData] = useState<FormData>({
    lastName: '',
    firstName: '',
    lastNameKana: '',
    firstNameKana: '',
    birthDate: '',
    gender: '',
    phone: '',
    email: '',
    department: '',
    jobType: '',
    employmentType: '',
    joinDate: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  if (!isOpen) return null;

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSuccess();
      onClose();
      setFormData({
        lastName: '',
        firstName: '',
        lastNameKana: '',
        firstNameKana: '',
        birthDate: '',
        gender: '',
        phone: '',
        email: '',
        department: '',
        jobType: '',
        employmentType: '',
        joinDate: '',
      });
      setErrors({});
    }
  };

  const inputClass =
    'border border-[#E2E8F0] rounded-lg px-3 py-2 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6FDE]/30 focus:border-[#0F6FDE]';
  const labelClass = 'text-sm font-medium text-[#1E293B] mb-1 block';
  const errorClass = 'text-xs text-red-500 mt-1';

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'modalEnter 0.2s ease-out',
          }}
        >
          <style>{`
            @keyframes modalEnter {
              from {
                opacity: 0;
                transform: scale(0.95) translateY(10px);
              }
              to {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}</style>

          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0]">
            <h2 className="text-lg font-bold text-[#1E293B]">新規職員登録</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
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

            {/* 生年月日 */}
            <div>
              <label className={labelClass}>生年月日</label>
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) => handleChange('birthDate', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* 性別 */}
            <div>
              <label className={labelClass}>性別</label>
              <div className="flex items-center gap-6 mt-1">
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

            {/* 電話番号 */}
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

            {/* メールアドレス */}
            <div>
              <label className={labelClass}>メールアドレス</label>
              <input
                type="email"
                placeholder="example@hospital.example.jp"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* 部門 */}
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
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.department && <p className={errorClass}>{errors.department}</p>}
            </div>

            {/* 職種 */}
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
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
              {errors.jobType && <p className={errorClass}>{errors.jobType}</p>}
            </div>

            {/* 雇用形態 */}
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
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
              {errors.employmentType && <p className={errorClass}>{errors.employmentType}</p>}
            </div>

            {/* 入職日 */}
            <div>
              <label className={labelClass}>入職日</label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) => handleChange('joinDate', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#0F6FDE] rounded-lg hover:bg-[#0B5BBF] transition-colors"
              >
                登録する
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
