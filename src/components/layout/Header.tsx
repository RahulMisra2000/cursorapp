'use client';

import { useTheme } from 'next-themes';
import { Bell, Moon, Sun, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <header className="h-16 border-b bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="flex h-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold dark:text-white">Employee Schedule & Attendance</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleThemeToggle}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          <button
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>

          <button
            onClick={handleSignOut}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
            aria-label="Sign out"
          >
            <LogOut className="h-5 w-5" />
          </button>

          <Link
            href="/profile"
            className="flex items-center gap-2 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="h-8 w-8 rounded-full bg-gray-200" />
            <div>
              <p className="text-sm font-medium dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 