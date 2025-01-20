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
  Settings
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

  return (
    <div className="flex flex-col w-64 bg-white h-screen border-r">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg" />
          <span className="font-semibold text-xl">Astrea System</span>
        </div>
      </div>

      <div className="flex-1 px-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-500 px-2 py-2">MAIN</p>
          {MAIN_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  pathname === item.href
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 space-y-1">
          <p className="text-sm font-medium text-gray-500 px-2 py-2">USER</p>
          {USER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${
                  pathname === item.href
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 