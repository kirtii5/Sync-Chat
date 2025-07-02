import React, { useState, useRef, useEffect } from "react";
import ChatLayout from "./ChatLayout";
import { toast } from "sonner";

// Initial chats with unread count
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
    unreadCount: 1,
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

// Static messages
const mockMessagesByChatId = {
  1: [
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
  ],
  2: [
    {
      id: "1",
      content: "Hey team, client meeting at 3 PM today.",
      sender: "Team Alpha",
      timestamp: new Date(Date.now() - 600000),
      isOwn: false,
    },
    {
      id: "2",
      content: "Copy that!",
      sender: "You",
      timestamp: new Date(Date.now() - 550000),
      isOwn: true,
    },
  ],
  3: [
    {
      id: "1",
      content: "Need any help with deployment?",
      sender: "You",
      timestamp: new Date(Date.now() - 7200000),
      isOwn: true,
    },
    {
      id: "2",
      content: "Sure, ping me anytime.",
      sender: "Bob Smith",
      timestamp: new Date(Date.now() - 7100000),
      isOwn: false,
    },
  ],
  4: [
    {
      id: "1",
      content: "Uploaded new UI components.",
      sender: "Design Squad",
      timestamp: new Date(Date.now() - 10800000),
      isOwn: false,
    },
    {
      id: "2",
      content: "Awesome! Will check and review.",
      sender: "You",
      timestamp: new Date(Date.now() - 10750000),
      isOwn: true,
    },
  ],
};

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState(mockChats);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessagesByChatId[selectedChat.id] || []);

      // Clear unread count for selected chat
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat.id ? { ...chat, unreadCount: 0 } : chat
        )
      );
    }
  }, [selectedChat]);

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

    // Simulate reply
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
      mockChats={chats}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
}
