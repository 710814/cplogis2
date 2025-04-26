import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Package, Truck, FileText, Calendar, Search, Users, Settings } from 'lucide-react';

export function AppSidebar() {
  const location = useLocation();

  const menuItems = [
    { icon: Calendar, label: '대시보드', path: '/' },
    { icon: Package, label: '배송요청관리', path: '/shipments' },
    { icon: FileText, label: '송장관리', path: '/waybills' },
    { icon: Search, label: '배송추적', path: '/tracking' },
    { icon: Truck, label: '물류사관리', path: '/partners' },
    { icon: Users, label: '사용자관리', path: '/users' },
    { icon: Settings, label: '설정', path: '/settings' },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="p-4 flex flex-col items-center">
        <div className="font-bold text-xl text-white">AEL</div>
        <div className="text-xs text-white/70">Asia Express Link</div>
        <SidebarTrigger className="absolute right-2 top-4 text-white" />
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    isActive ? "w-full flex items-center gap-2 px-3 py-2 bg-sidebar-accent text-white" : 
                    "w-full flex items-center gap-2 px-3 py-2 text-white/80 hover:bg-sidebar-accent/50"
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4">
        <div className="text-xs text-white/70 text-center">
          시스템 버전 1.0.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
