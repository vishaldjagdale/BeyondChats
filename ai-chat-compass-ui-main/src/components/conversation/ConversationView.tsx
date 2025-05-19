
import React, { useState, useRef, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Conversation, Message, ConversationTag, mockAiSuggestions } from "@/data/mockData";
import { format } from 'date-fns';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronLeft, Send, Sparkles, Paperclip, Tag, User } from "lucide-react";

interface ConversationViewProps {
  conversation: Conversation;
  onBackToList?: () => void;
  onToggleUserDetails?: () => void;
}

const ConversationView: React.FC<ConversationViewProps> = ({ 
  conversation, 
  onBackToList,
  onToggleUserDetails
}) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    scrollToBottom();
  }, [conversation]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In a real app, you would send this to an API
      console.log("Sending message:", newMessage);
      // Clear the input
      setNewMessage("");
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderTime = (timestamp: string) => {
    return format(new Date(timestamp), 'h:mm a');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex justify-between items-center">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onBackToList}>
            <ChevronLeft size={20} />
          </Button>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{conversation.subject}</h2>
            {conversation.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <p className="text-sm text-intercom-gray-500">
            with <span className="font-medium">{conversation.user.name}</span>
          </p>
        </div>

        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onToggleUserDetails}>
            <User size={20} />
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {conversation.messages.filter(msg => !msg.isAiSuggestion).map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex gap-3 max-w-[80%]",
                message.sender === 'user' ? 'mr-auto' : (message.sender === 'admin' ? 'ml-auto' : 'mx-auto')
              )}
            >
              {message.sender === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={conversation.user.avatar} />
                  <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              
              <div>
                <div 
                  className={cn(
                    "p-3 rounded-lg",
                    message.sender === 'user' 
                      ? 'bg-intercom-gray-100 text-intercom-gray-800' 
                      : message.sender === 'admin'
                      ? 'bg-intercom-blue text-white'
                      : 'bg-intercom-gray-100 text-intercom-gray-500 text-sm'
                  )}
                >
                  {message.content}
                </div>
                <div className="mt-1 text-xs text-intercom-gray-500">
                  {renderTime(message.timestamp)}
                </div>
              </div>
              
              {message.sender === 'admin' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        {/* AI Suggestions */}
        {mockAiSuggestions[conversation.id] && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-intercom-blue" />
              <span className="text-sm font-medium text-intercom-gray-700">AI suggested replies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockAiSuggestions[conversation.id].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-left text-xs justify-start border-intercom-blue-light text-intercom-blue h-auto py-2 hover:bg-intercom-blue-light hover:text-intercom-blue"
                  onClick={() => setNewMessage(suggestion)}
                >
                  {suggestion.length > 70 ? `${suggestion.substring(0, 67)}...` : suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Reply Box */}
        <div className="bg-white rounded-lg border">
          <Textarea
            placeholder="Type your reply..."
            className="min-h-[80px] resize-none border-0 focus-visible:ring-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex justify-between items-center p-2 border-t bg-intercom-gray-50">
            <Button variant="ghost" size="icon">
              <Paperclip size={16} />
            </Button>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm">
                <Tag className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Add tag</span>
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                size="sm"
              >
                <Send className="mr-1 h-4 w-4" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
