'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { staffList, qualifications } from '@/data/mockData';

const jobTypeBadgeColor: Record<string, string> = {
  '医師': 'bg-blue-100 text-blue-700',
  '看護師': 'bg-green-100 text-green-700',
  '薬剤師': 'bg-amber-100 text-amber-700',
  '技師': 'bg-purple-100 text-purple-700',
  '事務職': 'bg-pink-100 text-pink-700',
  'その他': 'bg-gray-100 text-gray-700',
};

const statusBadgeColor: Record<string, string> = {
  '出勤': 'bg-green-100 text-green-700',
  '休暇': 'bg-amber-100 text-amber-700',
  '退職': 'bg-gray-100 text-gray-500',
};

const qualStatusColor: Record<string, string> = {
  '有効': 'bg-green-100 text-green-700',
  '更新予定': 'bg-amber-100 text-amber-700',
  '期限切れ': 'bg-red-100 text-red-700',
};

const recentAttendance = [
  { date: '03/05（水）', clockIn: '08:30', clockOut: '17:45', hours: '9:15' },
  { date: '03/04（火）', clockIn: '08:25', clockOut: '18:00', hours: '9:35' },
  { date: '03/03（月）', clockIn: '08:35', clockOut: '17:30', hours: '8:55' },
  { date: '02/28（金）', clockIn: '08:30', clockOut: '17:50', hours: '9:20' },
  { date: '02/27（木）', clockIn: '08:40', clockOut: '18:15', hours: '9:35' },
];

type TabKey = 'basic' | 'qualifications' | 'attendance';

export default function StaffDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('basic');

  const staffId = params.id as string;
  const staff = staffList.find((s) => s.id === staffId);

  if (!staff) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">職員が見つかりませんでした</p>
        <button
          onClick={() => router.push('/staff')}
          className="mt-4 text-[#0F6FDE] hover:underline"
        >
          職員一覧に戻る
        </button>
      </div>
    );
  }

  const staffQualifications = qualifications[staff.id] || [];

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'basic', label: '基本情報' },
    { key: 'qualifications', label: '資格・免許' },
    { key: 'attendance', label: '勤怠サマリー' },
  ];

  const basicInfoRows = [
    { label: '職員番号', value: staff.id },
    { label: '氏名', value: staff.name },
    { label: '氏名かな', value: staff.nameKana },
    { label: '生年月日', value: staff.birthDate },
    { label: '性別', value: staff.gender },
    { label: '電話番号', value: staff.phone },
    { label: 'メールアドレス', value: staff.email },
    { label: '住所', value: staff.address },
    { label: '部門', value: staff.department },
    { label: '職種', value: staff.jobType },
    { label: '雇用形態', value: staff.employmentType },
    { label: '役職', value: staff.position },
    { label: '入職日', value: staff.joinDate },
    { label: 'ステータス', value: staff.status },
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/staff')}
        className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        職員一覧に戻る
      </button>

      {/* Header card */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#0F6FDE] text-white flex items-center justify-center text-2xl font-bold shrink-0">
            {staff.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1E293B]">{staff.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  jobTypeBadgeColor[staff.jobType] || jobTypeBadgeColor['その他']
                }`}
              >
                {staff.jobType}
              </span>
              <span className="text-sm text-gray-500">{staff.department}</span>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                  statusBadgeColor[staff.status] || 'bg-gray-100 text-gray-500'
                }`}
              >
                {staff.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs + Content */}
      <div className="bg-white rounded-xl border border-[#E2E8F0]">
        {/* Tabs */}
        <div className="flex border-b border-[#E2E8F0]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-medium text-center transition-colors ${
                activeTab === tab.key
                  ? 'text-[#0F6FDE] border-b-2 border-[#0F6FDE]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'basic' && (
            <div className="space-y-0">
              {basicInfoRows.map((row) => (
                <div
                  key={row.label}
                  className="grid grid-cols-[160px_1fr] py-3 border-b border-[#E2E8F0] last:border-b-0"
                >
                  <span className="text-sm text-gray-500">{row.label}</span>
                  <span className="text-sm text-[#1E293B]">{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'qualifications' && (
            <div>
              {staffQualifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-8">資格情報はありません</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-2 font-medium text-gray-600">資格名</th>
                      <th className="text-left py-2 font-medium text-gray-600">取得日</th>
                      <th className="text-left py-2 font-medium text-gray-600">有効期限</th>
                      <th className="text-left py-2 font-medium text-gray-600">ステータス</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffQualifications.map((q, i) => (
                      <tr key={i} className="border-b border-[#E2E8F0] last:border-b-0">
                        <td className="py-3 text-[#1E293B]">{q.name}</td>
                        <td className="py-3 text-gray-600">{q.acquiredDate}</td>
                        <td className="py-3 text-gray-600">{q.expiryDate || '-'}</td>
                        <td className="py-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                              qualStatusColor[q.status] || 'bg-gray-100 text-gray-500'
                            }`}
                          >
                            {q.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'attendance' && (
            <div className="space-y-6">
              {/* Monthly summary cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">今月の出勤日数</div>
                  <div className="text-lg font-bold text-[#1E293B]">18日 / 22日</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">今月の残業時間</div>
                  <div className="text-lg font-bold text-[#1E293B]">12.5時間</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="text-xs text-gray-500 mb-1">有給残日数</div>
                  <div className="text-lg font-bold text-[#1E293B]">14日 / 20日</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: '70%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent attendance */}
              <div>
                <h3 className="text-sm font-medium text-[#1E293B] mb-3">直近5日の出退勤</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#E2E8F0]">
                      <th className="text-left py-2 font-medium text-gray-600">日付</th>
                      <th className="text-left py-2 font-medium text-gray-600">出勤</th>
                      <th className="text-left py-2 font-medium text-gray-600">退勤</th>
                      <th className="text-left py-2 font-medium text-gray-600">勤務時間</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAttendance.map((record, i) => (
                      <tr key={i} className="border-b border-[#E2E8F0] last:border-b-0">
                        <td className="py-2 text-[#1E293B]">{record.date}</td>
                        <td className="py-2 text-gray-600">{record.clockIn}</td>
                        <td className="py-2 text-gray-600">{record.clockOut}</td>
                        <td className="py-2 text-gray-600">{record.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
