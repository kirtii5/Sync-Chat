import React, { useState, useRef, useEffect } from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Send,
  MessageCircle,
  Users,
  User,
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { UserMenu } from "@/components/ui/UserMenu";
import { Toaster, toast } from "sonner";

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

const formatTime = (date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
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

  const clerk = useClerk();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await clerk.signOut();
    navigate("/"); // Redirect to landing/home page after logout
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background text-foreground overflow-hidden">
      <Toaster />
      <div className="w-full md:w-80 border-r border-border flex flex-col bg-card">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Sync-Chat</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search..." className="pl-10" />
          </div>
        </div>

        <ScrollArea className="flex-1 p-2">
          {mockChats.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-muted/40 ${
                selectedChat.id === chat.id ? "bg-muted/40" : ""
              }`}
              onClick={() => setSelectedChat(chat)}>
              <Avatar>
                <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {chat.type === "group" ? (
                    <Users className="h-4 w-4" />
                  ) : (
                    chat.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm truncate">{chat.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unreadCount > 0 && (
                <Badge className="text-xs px-2 py-1 h-5 min-w-[20px] flex justify-center items-center">
                  {chat.unreadCount}
                </Badge>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-card">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <Avatar>
              <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {selectedChat.type === "group" ? (
                  <Users className="h-4 w-4" />
                ) : (
                  selectedChat.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-sm font-bold">{selectedChat.name}</h2>
              <p className="text-xs text-muted-foreground">
                {selectedChat.isOnline ? "Online" : "Last seen recently"}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost">
              <Phone className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Video className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <Info className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.isOwn
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}>
                {msg.content}
                <div className="text-[10px] mt-1 text-end">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 p-3 bg-muted rounded-2xl text-sm">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </ScrollArea>

        <form
          onSubmit={handleSendMessage}
          className="p-4 border-t border-border flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-2xl"
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
