import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout({ ...props }) {
  const {
    selectedChat,
    setSelectedChat,
    messages,
    setMessages,
    newMessage,
    setNewMessage,
    isTyping,
    setIsTyping,
    handleSendMessage,
    messagesEndRef,
    mockChats,
  } = props;

  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsMobileChatOpen(true);
  };

  const handleBack = () => setIsMobileChatOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-full md:w-80 bg-card border-r border-border ${
          isMobileChatOpen ? "hidden md:block" : "block"
        }`}>
        <ChatSidebar
          selectedChat={selectedChat}
          setSelectedChat={handleChatSelect}
          mockChats={mockChats}
        />
      </div>

      {/* Chat Area */}
      <div
        className={`flex-1 flex flex-col bg-card ${
          isMobileChatOpen ? "block" : "hidden md:flex"
        }`}>
        <ChatHeader selectedChat={selectedChat} onBack={handleBack} />

        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
        />

        <ChatInput
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </div>
  );
}
