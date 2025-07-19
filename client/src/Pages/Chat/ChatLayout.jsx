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
  socket,
  handleDeleteMessages,
  currentUserMongoId,
  unreadCounts,
}) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsMobileChatOpen(true);
  };
  const handleBack = () => {
    setIsMobileChatOpen(false);
    setTimeout(
      () => setSelectedChat(null),
      localStorage.removeItem("selectedChat"),
      200
    );
  };

  const handleDeleteChat = () => {
    setSelectedChat(null);
    setChats((prevChats) =>
      prevChats.filter((chat) => chat.chatId !== selectedChat.chatId)
    );
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
            unreadCounts={unreadCounts}
          />
        </div>

        {selectedChat && (
          <div
            className={`flex-1 flex flex-col bg-card h-full max-h-screen ${
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
              onDeleteMessages={handleDeleteMessages}
              currentUserMongoId={currentUserMongoId}
            />
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              socket={socket}
              selectedChat={selectedChat}
            />
          </div>
        )}
      </div>
    </>
  );
}
