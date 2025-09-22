import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings,
  BarChart3,
  Calendar,
  HeadphonesIcon,
  Bell,
  LogOut,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  userRole: 'manager' | 'attendant' | 'patient';
}

export function Sidebar({ userRole }: SidebarProps) {
  const location = useLocation();

  const managerNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/manager' },
    { icon: Users, label: 'Equipe', path: '/manager/team' },
    { icon: MessageSquare, label: 'Atendimentos', path: '/manager/conversations' },
    { icon: BarChart3, label: 'Relatórios', path: '/manager/reports' },
    { icon: Calendar, label: 'Agenda', path: '/manager/schedule' },
    { icon: Settings, label: 'Configurações', path: '/manager/settings' },
  ];

  const attendantNavItems = [
    { icon: MessageSquare, label: 'Inbox', path: '/attendant' },
    { icon: Users, label: 'Pacientes', path: '/attendant/patients' },
    { icon: Calendar, label: 'Agenda', path: '/attendant/schedule' },
    { icon: HeadphonesIcon, label: 'Suporte', path: '/attendant/support' },
  ];

  const patientNavItems = [
    { icon: MessageSquare, label: 'Chat', path: '/patient' },
    { icon: Calendar, label: 'Consultas', path: '/patient/appointments' },
    { icon: BarChart3, label: 'Histórico', path: '/patient/history' },
  ];

  const navItems =
    userRole === 'manager'
      ? managerNavItems
      : userRole === 'attendant'
      ? attendantNavItems
      : patientNavItems;

  return (
    <div className="flex h-screen w-64 flex-col bg-gradient-primary">
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-sidebar-foreground">
          MedOmni
        </h1>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  location.pathname === item.path && 'bg-sidebar-accent'
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t border-sidebar-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <Bell className="mr-3 h-4 w-4" />
          Notificações
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}