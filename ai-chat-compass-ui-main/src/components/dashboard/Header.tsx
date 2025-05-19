
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  className?: string;
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ className, onToggleSidebar }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className={`w-full border-b bg-white flex items-center justify-between px-4 py-3 ${className}`}>
      {isMobile && (
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-2">
          <Menu size={20} />
        </Button>
      )}
      
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intercom-gray-400" size={18} />
          <Input 
            placeholder="Search conversations, users..."
            className="pl-10 w-full bg-intercom-gray-100 border-0 focus-visible:ring-intercom-blue"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm hidden md:flex">
                <span className="font-medium">Sarah Johnson</span>
                <span className="text-xs text-intercom-gray-500">Support Lead</span>
              </div>
              <ChevronDown size={16} className="text-intercom-gray-400 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
