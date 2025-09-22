import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ConversationList } from '@/components/conversation/ConversationList';
import { ChatWindow } from '@/components/conversation/ChatWindow';
import { mockConversations } from '@/utils/mockData';
import { Conversation } from '@/types';

export default function AttendantInbox() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole="attendant" />
      
      <div className="flex flex-1">
        {/* Conversation List */}
        <div className="w-96 border-r bg-card">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold text-foreground">Conversas</h2>
            <p className="text-sm text-muted-foreground">
              {mockConversations.length} conversas ativas
            </p>
          </div>
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedConversation?.id}
            onSelect={setSelectedConversation}
          />
        </div>

        {/* Chat Window */}
        <div className="flex-1">
          <ChatWindow
            conversation={selectedConversation}
            onSendMessage={(message) => {
              console.log('Sending message:', message);
            }}
          />
        </div>
      </div>
    </div>
  );
}