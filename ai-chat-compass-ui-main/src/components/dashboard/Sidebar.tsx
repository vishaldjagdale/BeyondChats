
import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  MessageSquare, 
  Ticket, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, collapsed = false, onToggle }) => {
  const menuItems = [
    { name: 'Chats', icon: MessageSquare, active: true },
    { name: 'Tickets', icon: Ticket, active: false },
    { name: 'Contacts', icon: Users, active: false },
    { name: 'Settings', icon: Settings, active: false },
  ];

  return (
    <div 
      className={cn(
        "flex flex-col h-screen border-r relative transition-all duration-300 ease-in-out bg-white",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="font-bold text-xl text-intercom-blue">Intercom</div>
        )}
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("rounded-full p-1", collapsed && "mx-auto")}
          onClick={onToggle}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>
      
      <nav className="flex-1 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Button
                variant={item.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 rounded-none border-l-4",
                  item.active 
                    ? "border-l-intercom-blue bg-intercom-blue-light text-intercom-blue" 
                    : "border-l-transparent",
                  collapsed ? "px-4" : "px-4"
                )}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.name}</span>}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        {!collapsed && (
          <div className="text-xs text-intercom-gray-500">
            Intercom Admin v2.0
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
