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
  setChats,
  getToken,
}) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsMobileChatOpen(true);
  };
  const handleBack = () => {
    setIsMobileChatOpen(false);
    setTimeout(() => setSelectedChat(null), 200);
  };

  const handleDeleteChat = () => {
    // Remove from sidebar list
    setChats((prevChats) =>
      prevChats.filter((c) => c._id !== selectedChat._id)
    );
    // Close chat window
    setSelectedChat(null);
    setIsMobileChatOpen(false);
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <div
          className={`w-full md:w-80 bg-card border-r border-border ${
            isMobileChatOpen ? "hidden md:block" : "block"
          }`}>
          <ChatSidebar
            selectedChat={selectedChat}
            setSelectedChat={handleChatSelect}
            chatUsers={chatUsers}
            setChats={setChats}
          />
        </div>

        {selectedChat && (
          <div
            className={`flex-1 flex flex-col bg-card ${
              isMobileChatOpen ? "block" : "hidden md:flex"
            }`}>
            <ChatHeader
              selectedChat={selectedChat}
              onBack={handleBack}
              onDelete={handleDeleteChat}
            />

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
    </>
  );
}
