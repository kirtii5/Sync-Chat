import React, { useState, useRef, useEffect } from "react";
import ChatLayout from "./ChatLayout";
import { toast } from "sonner";

// Mock data
const mockChats = [
  {
    id: "1",
    name: "Alice Johnson",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m ago",
    unreadCount: 2,
    isOnline: true,
    type: "direct",
  },
  {
    id: "2",
    name: "Team Alpha",
    lastMessage: "Meeting at 3 PM today",
    timestamp: "1h ago",
    unreadCount: 0,
    isOnline: false,
    type: "group",
  },
  {
    id: "3",
    name: "Bob Smith",
    lastMessage: "Thanks for the help!",
    timestamp: "3h ago",
    unreadCount: 1,
    isOnline: false,
    type: "direct",
  },
  {
    id: "4",
    name: "Design Team",
    lastMessage: "New mockups are ready",
    timestamp: "1d ago",
    unreadCount: 5,
    isOnline: false,
    type: "group",
  },
];

const mockMessages = [
  {
    id: "1",
    content: "Hey! How are you doing?",
    sender: "Alice Johnson",
    timestamp: new Date(Date.now() - 120000),
    isOwn: false,
  },
  {
    id: "2",
    content:
      "I'm doing great! Just working on some new features for our chat app.",
    sender: "You",
    timestamp: new Date(Date.now() - 60000),
    isOwn: true,
  },
  {
    id: "3",
    content: "That sounds exciting! Can you tell me more about it?",
    sender: "Alice Johnson",
    timestamp: new Date(Date.now() - 30000),
    isOwn: false,
  },
];

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! I'll get back to you soon.",
        sender: selectedChat.name,
        timestamp: new Date(),
        isOwn: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 2000);
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
      mockChats={mockChats}
    />
  );
}
