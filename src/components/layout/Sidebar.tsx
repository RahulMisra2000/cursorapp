'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Calendar,
  BarChart,
  UserCircle,
  Settings,
  FileText,
  Bell
} from 'lucide-react';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

const MAIN_NAV: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: 'Message',
    href: '/messages',
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    label: 'Employee',
    href: '/employee',
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: 'Schedule',
    href: '/schedule',
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: <BarChart className="w-5 h-5" />,
  },
];

const USER_NAV: NavItem[] = [
  {
    label: 'Profile',
    href: '/profile',
    icon: <UserCircle className="w-5 h-5" />,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: <Settings className="w-5 h-5" />,
  },
];

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Calendar,
    },
    {
      title: 'Employees',
      href: '/employees',
      icon: Users,
    },
    {
      title: 'Request & Reminders',
      href: '/requests',
      icon: Bell,
    },
    {
      title: 'Reports',
      href: '/reports',
      icon: FileText,
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-900 h-screen border-r dark:border-gray-800">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg" />
          <span className="font-semibold text-xl dark:text-white">Astrea System</span>
        </div>
      </div>

      <div className="flex-1 px-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2 py-2">
            MAIN
          </p>
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  pathname === item.href
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2 py-2">
            USER
          </p>
          {USER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  pathname === item.href
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 px-2 py-2">
            REQUESTS
          </p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 