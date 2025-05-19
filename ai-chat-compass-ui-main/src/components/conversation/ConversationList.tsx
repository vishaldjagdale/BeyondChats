
import React, { useState } from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Filter, Clock } from "lucide-react";
import { Conversation } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation 
}) => {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredConversations = conversations.filter(conversation => {
    if (filterStatus !== "all" && conversation.status !== filterStatus) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        conversation.user.name.toLowerCase().includes(query) ||
        conversation.subject.toLowerCase().includes(query) ||
        conversation.lastMessage.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
        
        <div className="flex items-center gap-2 mb-4">
          <Select defaultValue="all" onValueChange={setFilterStatus}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All conversations</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <Filter size={16} />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-intercom-gray-400" size={16} />
          <Input 
            placeholder="Search conversations"
            className="pl-10 bg-intercom-gray-50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-6 text-center text-intercom-gray-500">
            No conversations match your filters
          </div>
        ) : (
          <ul>
            {filteredConversations.map((conversation) => (
              <li key={conversation.id} onClick={() => onSelectConversation(conversation)}>
                <button 
                  className={cn(
                    "w-full p-4 text-left border-b hover:bg-intercom-gray-50 transition-colors duration-200",
                    selectedConversationId === conversation.id && "bg-intercom-blue-light",
                    conversation.unread && "font-medium"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 flex-shrink-0">
                      <AvatarImage src={conversation.user.avatar} />
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium truncate">{conversation.user.name}</span>
                        <span className="text-xs text-intercom-gray-500 flex items-center whitespace-nowrap">
                          <Clock size={12} className="mr-1" />
                          {conversation.lastMessageTime}
                        </span>
                      </div>
                      
                      <p className="text-sm truncate text-intercom-gray-700 mb-1">
                        {conversation.subject}
                      </p>
                      
                      <p className="text-xs truncate text-intercom-gray-500">
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {conversation.status === 'open' && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px]">
                            Open
                          </Badge>
                        )}
                        {conversation.status === 'pending' && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 text-[10px]">
                            Pending
                          </Badge>
                        )}
                        {conversation.status === 'assigned' && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px]">
                            Assigned
                          </Badge>
                        )}
                        {conversation.status === 'closed' && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-[10px]">
                            Closed
                          </Badge>
                        )}
                        
                        {conversation.tags.includes('Urgent') && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px]">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
