import React, { useState, useRef, useEffect } from "react";
import ChatLayout from "./ChatLayout";
import { toast } from "sonner";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]); // now dynamic
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setMessages([]); // You can fetch real messages later
    }
  }, [selectedChat]);

  const addUserToChat = (user) => {
    if (!chats.find((u) => u._id === user._id)) {
      setChats((prev) => [...prev, user]);
    }
    setSelectedChat(user);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "You",
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    toast.success("Your message has been delivered.");

    // Simulated reply
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: (Date.now() + 1).toString(),
        content: "Thanks! I'll get back to you.",
        sender: selectedChat.username,
        timestamp: new Date(),
        isOwn: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
  };

  return (
    <ChatLayout
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
      messages={messages}
      setMessages={setMessages}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      isTyping={isTyping}
      setIsTyping={setIsTyping}
      handleSendMessage={handleSendMessage}
      messagesEndRef={messagesEndRef}
      chatUsers={chats}
      addUserToChat={addUserToChat}
    />
  );
}
