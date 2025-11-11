import React from 'react';
import ChatManagement from '../../components/chat/ChatManagement';

const ChatApp: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Management</h1>
      <ChatManagement />
      {/* Other chat components */}
    </div>
  );
};

export default ChatApp;
