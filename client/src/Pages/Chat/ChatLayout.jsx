import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export default function ChatLayout({
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
  chatUsers,
  addUserToChat,
}) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsMobileChatOpen(true);
  };

  const handleBack = () => {
    setIsMobileChatOpen(false);
    setSelectedChat(null);
  };

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
          chatUsers={chatUsers}
          addUserToChat={addUserToChat}
        />
      </div>

      {/* Chat Area */}
      {selectedChat && (
        <div
          className={`flex-1 flex flex-col bg-card ${
            isMobileChatOpen ? "block" : "hidden md:flex"
          }`}>
          <ChatHeader selectedChat={selectedChat}>
            <button
              onClick={handleBack}
              className="md:hidden text-sm text-primary px-4 py-2">
              ← Back
            </button>
          </ChatHeader>
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
      )}
    </div>
  );
}
