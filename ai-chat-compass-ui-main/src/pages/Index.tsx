
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import ConversationList from '@/components/conversation/ConversationList';
import ConversationView from '@/components/conversation/ConversationView';
import UserDetails from '@/components/conversation/UserDetails';
import { mockConversations, Conversation } from '@/data/mockData';
import { useIsMobile } from '@/hooks/use-mobile';

enum Panel {
  ConversationList = 'conversationList',
  ConversationView = 'conversationView',
  UserDetails = 'userDetails'
}

const Index = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [activePanel, setActivePanel] = useState<Panel>(Panel.ConversationList);
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Update panel visibility based on screen size
  useEffect(() => {
    if (!isMobile && selectedConversation) {
      setActivePanel(Panel.ConversationView);
    }
  }, [isMobile, selectedConversation]);

  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    if (isMobile) {
      setActivePanel(Panel.ConversationView);
    }
  };

  const handleBackToList = () => {
    setActivePanel(Panel.ConversationList);
  };

  const handleToggleUserDetails = () => {
    setActivePanel(Panel.UserDetails);
  };

  const handleCloseUserDetails = () => {
    setActivePanel(Panel.ConversationView);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} className="z-30" />
      
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        
        <div className="flex-1 flex overflow-hidden">
          {/* Conversation List */}
          {(!isMobile || activePanel === Panel.ConversationList) && (
            <div className={`${isMobile ? 'w-full' : sidebarCollapsed ? 'w-1/3' : 'w-1/4'} overflow-hidden transition-all duration-300`}>
              <ConversationList 
                conversations={mockConversations} 
                selectedConversationId={selectedConversation?.id || null}
                onSelectConversation={handleSelectConversation}
              />
            </div>
          )}
          
          {/* Conversation View */}
          {(!isMobile || activePanel === Panel.ConversationView) && selectedConversation && (
            <div className={`${isMobile ? 'w-full' : sidebarCollapsed ? 'w-2/3' : 'w-2/4'} overflow-hidden transition-all duration-300`}>
              <ConversationView 
                conversation={selectedConversation}
                onBackToList={isMobile ? handleBackToList : undefined}
                onToggleUserDetails={isMobile ? handleToggleUserDetails : undefined}
              />
            </div>
          )}
          
          {/* User Details */}
          {(!isMobile || activePanel === Panel.UserDetails) && selectedConversation && (
            <div className={`${isMobile ? 'w-full' : 'w-1/4'} overflow-hidden transition-all duration-300`}>
              <UserDetails 
                user={selectedConversation.user}
                assignedTo={selectedConversation.assignedTo}
                onClose={isMobile ? handleCloseUserDetails : undefined}
              />
            </div>
          )}
          
          {/* Empty State */}
          {!selectedConversation && !isMobile && (
            <div className={`${sidebarCollapsed ? 'w-2/3' : 'w-3/4'} flex items-center justify-center bg-intercom-gray-50 transition-all duration-300`}>
              <div className="text-center max-w-md p-6">
                <h3 className="text-xl font-semibold mb-2">No conversation selected</h3>
                <p className="text-intercom-gray-500">
                  Select a conversation from the list to view messages and customer details.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
