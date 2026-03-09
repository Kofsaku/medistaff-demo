'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import Breadcrumb from '@/components/layout/Breadcrumb';
import NotificationDrawer from '@/components/ui/NotificationDrawer';
import SettingsModal from '@/components/settings/SettingsModal';
import { StaffProvider } from '@/lib/StaffContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === '/login';

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isAuthed = sessionStorage.getItem('medistaff_auth') === 'true';
    if (!isLoginPage && !isAuthed) {
      router.replace('/login');
    } else {
      setAuthChecked(true);
    }
  }, [pathname, isLoginPage, router]);

  return (
    <html lang="ja">
      <head>
        <title>MediStaff - 病院職員管理システム</title>
        <meta name="description" content="病院職員管理システム デモアプリ" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-white text-[#1E293B]`}>
        {isLoginPage ? (
          children
        ) : authChecked ? (
          <StaffProvider>
            <Header onNotificationClick={() => setNotificationOpen(true)} />
            <Sidebar onSettingsClick={() => setSettingsOpen(true)} />
            <main className="ml-64 mt-16 min-h-[calc(100vh-4rem)] overflow-x-hidden">
              <div className="px-6 py-4">
                <Breadcrumb />
              </div>
              <div className="px-6 pb-8 page-enter">
                {children}
              </div>
            </main>

            <div className="fixed bottom-4 right-4 text-xs opacity-30 select-none z-10">
              DEMO | miitaso Inc.
            </div>

            <NotificationDrawer
              isOpen={notificationOpen}
              onClose={() => setNotificationOpen(false)}
            />
            <SettingsModal
              isOpen={settingsOpen}
              onClose={() => setSettingsOpen(false)}
            />
          </StaffProvider>
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full" />
          </div>
        )}
      </body>
    </html>
  );
}
