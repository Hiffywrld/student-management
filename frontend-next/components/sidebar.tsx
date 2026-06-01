'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth-context';
import { Button } from '@/components/ui/button';

export function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
    },
  ];

  if (user?.role === 'admin') {
    menuItems.push({
      label: 'Students',
      href: '/admin/students',
      icon: '👥',
    });
    menuItems.push({
      label: 'Teachers',
      href: '/admin/teachers',
      icon: '🎓',
    });
  }

  if (user?.role === 'teacher') {
    menuItems.push({
      label: 'My Students',
      href: '/teacher/students',
      icon: '👥',
    });
    menuItems.push({
      label: 'Courses',
      href: '/teacher/courses',
      icon: '📚',
    });
  }

  if (user?.role === 'student') {
    menuItems.push({
      label: 'My Courses',
      href: '/student/courses',
      icon: '📚',
    });
    menuItems.push({
      label: 'My Grades',
      href: '/student/grades',
      icon: '📈',
    });
  }

  if (user?.role === 'parent') {
    menuItems.push({
      label: `My Child's Progress`,
      href: '/parent/progress',
      icon: '📊',
    });
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 17s4.5 10.747 10 10.747c5.5 0 10-4.998 10-10.747S17.5 6.253 12 6.253z"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-lg text-sidebar-foreground">EduHub</h1>
            <p className="text-xs text-sidebar-accent-foreground">School System</p>
          </div>
        </div>

        <div className="bg-sidebar-accent/30 rounded-lg p-3 mb-6">
          <p className="text-xs font-semibold text-sidebar-foreground">Logged in as</p>
          <p className="text-sm font-bold text-primary mt-1">{user?.name}</p>
          <p className="text-xs text-sidebar-accent-foreground capitalize">{user?.role}</p>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border bg-sidebar">
        <Button
          variant="outline"
          className="w-full justify-start text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <span className="mr-2">🚪</span>
          Logout
        </Button>
      </div>
    </aside>
  );
}
