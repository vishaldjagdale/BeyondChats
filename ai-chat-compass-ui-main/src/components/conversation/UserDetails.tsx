
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { User, Admin, mockAdmins } from "@/data/mockData";
import { MapPin, Building, Clock, Calendar, Phone, Mail, X, UserPlus, BellOff, Shield } from "lucide-react";

interface UserDetailsProps {
  user: User;
  assignedTo?: string;
  onClose?: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, assignedTo, onClose }) => {
  const getAssignedAdmin = (): Admin | undefined => {
    if (!assignedTo) return undefined;
    return mockAdmins.find(admin => admin.id === assignedTo);
  };

  const assignedAdmin = getAssignedAdmin();

  return (
    <div className="h-full border-l flex flex-col overflow-y-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Customer Details</CardTitle>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X size={18} />
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-20 w-20 mb-3">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h3 className="text-xl font-medium">{user.name}</h3>
          <p className="text-sm text-intercom-gray-500">{user.email}</p>
          
          <div className="flex items-center mt-2">
            <Badge 
              variant="outline" 
              className={`
                ${user.status === 'online' ? 'bg-green-50 text-green-700 border-green-200' : 
                  user.status === 'away' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                  'bg-intercom-gray-100 text-intercom-gray-500 border-intercom-gray-200'}
              `}
            >
              <span className={`
                h-2 w-2 rounded-full mr-1
                ${user.status === 'online' ? 'bg-green-500' : 
                  user.status === 'away' ? 'bg-yellow-500' : 
                  'bg-intercom-gray-400'}
              `}></span>
              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </Badge>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">
              <Mail className="mr-1 h-4 w-4" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="mr-1 h-4 w-4" />
              Call
            </Button>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Assign to</h4>
            <Select defaultValue={assignedTo || "unassigned"}>
              <SelectTrigger>
                <SelectValue placeholder="Assign conversation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassigned">Unassigned</SelectItem>
                {mockAdmins.map(admin => (
                  <SelectItem key={admin.id} value={admin.id}>
                    {admin.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {assignedAdmin && (
              <div className="flex items-center mt-2 p-2 bg-intercom-blue-light rounded">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src={assignedAdmin.avatar} />
                  <AvatarFallback>{assignedAdmin.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-xs">
                  <p className="font-medium">{assignedAdmin.name}</p>
                  <p className="text-intercom-gray-500">{assignedAdmin.role}</p>
                </div>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Actions</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="justify-start">
                <UserPlus className="mr-1 h-4 w-4" />
                Add note
              </Button>
              <Button variant="outline" size="sm" className="justify-start">
                <BellOff className="mr-1 h-4 w-4" />
                Mute
              </Button>
              <Button variant="outline" size="sm" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                <Shield className="mr-1 h-4 w-4" />
                Block
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-3">Customer information</h4>
            <div className="space-y-3">
              {user.company && (
                <div className="flex items-start gap-2">
                  <Building size={16} className="text-intercom-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm">{user.company}</p>
                    <p className="text-xs text-intercom-gray-500">Company</p>
                  </div>
                </div>
              )}
              
              {user.plan && (
                <div className="flex items-start gap-2">
                  <Shield size={16} className="text-intercom-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm">{user.plan}</p>
                    <p className="text-xs text-intercom-gray-500">Subscription</p>
                  </div>
                </div>
              )}
              
              {user.location && (
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="text-intercom-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm">{user.location}</p>
                    <p className="text-xs text-intercom-gray-500">Location</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-2">
                <Calendar size={16} className="text-intercom-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm">May 10, 2023</p>
                  <p className="text-xs text-intercom-gray-500">Signed up</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Clock size={16} className="text-intercom-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm">{user.lastActive}</p>
                  <p className="text-xs text-intercom-gray-500">Last active</p>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Previous conversations</h4>
            <div className="text-center p-3 bg-intercom-gray-50 rounded text-sm text-intercom-gray-500">
              No previous conversations
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
};

export default UserDetails;
