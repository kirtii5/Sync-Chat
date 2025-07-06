import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import UserSearchModal from "@/components/ui/UserSearchModal";

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
  fetchChats,
  getToken,
}) {
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsMobileChatOpen(true);
  };
  const handleBack = () => {
    setIsMobileChatOpen(false);
    setSelectedChat(null);
  };

  const addUserToChat = (user) => {
    // Called by search modal
    // call backend to create chat:
    axios
      .post(
        "http://localhost:4000/api/chats/chat",
        { otherUserId: user._id },
        { headers: { Authorization: `Bearer ${getToken()}` } }
      )
      .then(() => fetchChats())
      .catch(console.error);
  };

  return (
    <>
      <UserSearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addUserToChat={addUserToChat}
      />

      <div className="flex h-screen overflow-hidden">
        <div
          className={`w-full md:w-80 bg-card border-r border-border ${
            isMobileChatOpen ? "hidden md:block" : "block"
          }`}>
          <ChatSidebar
            setIsModalOpen={setIsModalOpen}
            selectedChat={selectedChat}
            setSelectedChat={handleChatSelect}
            chatUsers={chatUsers}
            setChats={setChats}
            fetchChats={fetchChats}
          />
        </div>

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
    </>
  );
}
