import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { User, MessageCircle, Search, X } from "lucide-react";
import { UserMenu } from "@/components/ui/UserMenu";

// Format timestamp nicely
const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();

  const sameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (sameDay) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  if (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  ) {
    return "Yesterday";
  }

  return date.toLocaleDateString();
};

export default function ChatSidebar({
  selectedChat,
  setSelectedChat,
  chatUsers,
  setChats,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { userId, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!search.trim()) {
        setResults([]);
        return;
      }

      try {
        const token = await getToken();
        const res = await axios.get(
          "http://localhost:4000/api/users/allUsers",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const filtered = res.data.filter(
          (u) =>
            u.clerkId !== userId &&
            u.username.toLowerCase().includes(search.toLowerCase())
        );

        setResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const delay = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delay);
  }, [search, getToken, userId]);

  const handleUserClick = async (user) => {
    if (user.clerkId === userId) return;

    try {
      const token = await getToken();

      const userRes = await axios.get(
        "http://localhost:4000/api/users/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const currentUserInDB = userRes.data;
      if (!currentUserInDB || !currentUserInDB._id) {
        alert("⚠️ You are not in the system yet. Please ask admin to add you.");
        return;
      }

      const res = await axios.post(
        "http://localhost:4000/api/chats/chat",
        { otherUserId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const chat = res.data;

      const newChatUser = {
        _id: user._id,
        username: user.username || "Unknown",
        profileImage: user.profileImage || "",
        caption: user.caption || "Hey there!",
        clerkId: user.clerkId,
        chatId: chat._id,
        lastMessage: chat.lastMessage?.text ?? "",
        lastMessageTime: chat.lastMessage?.createdAt || chat.updatedAt,
        unreadCount: 0,
      };

      setChats((prev) => {
        const index = prev.findIndex((u) => u._id === newChatUser._id);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = { ...updated[index], ...newChatUser };
          return updated;
        }
        return [...prev, newChatUser];
      });

      setSelectedChat(newChatUser);
      setSearch("");
      setIsSearchOpen(false);
    } catch (err) {
      console.error("❌ Chat creation failed:", err);
    }
  };

  const filteredChatUsers = chatUsers.filter(
    (user, index, self) =>
      user.clerkId !== userId &&
      index === self.findIndex((u) => u._id === user._id)
  );

  return (
    <div className="flex flex-col h-full border-r border-border bg-card">
      <div className="p-4 flex justify-between items-center">
        <div className="flex justify-center items-center">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold ml-1">Sync-Chat</h1>
        </div>
        <div className="flex items-center space-x-2">
          <UserMenu />
          <Button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            size="icon"
            variant="ghost">
            {isSearchOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {isSearchOpen && (
        <div className="px-4 pb-2">
          <Input
            placeholder="Search by username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <hr />
      <ScrollArea className="flex-1">
        {isSearchOpen && results.length > 0 && (
          <div className="px-4 py-2 border-b border-border">
            {results.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => handleUserClick(user)}>
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={
                      user.profileImage &&
                      !user.profileImage.includes("img.clerk.com")
                        ? user.profileImage
                        : undefined
                    }
                    alt={user.username}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-muted flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.caption || "Hey there!"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredChatUsers.length === 0 && (
          <p className="text-sm text-center text-muted-foreground mt-4">
            No chats yet.
          </p>
        )}

        {filteredChatUsers.map((user) => (
          <div
            key={user._id}
            className={`flex justify-between items-center p-3 hover:bg-accent cursor-pointer ${
              selectedChat?._id === user._id ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedChat(user)}>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    user.profileImage &&
                    !user.profileImage.includes("img.clerk.com")
                      ? user.profileImage
                      : undefined
                  }
                  alt={user.username}
                  className="object-cover"
                />
                <AvatarFallback className="bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <div className="overflow-hidden">
                <p className="font-medium truncate">{user.username}</p>
                <p className="text-muted-foreground text-sm truncate w-40">
                  {user.lastMessage?.trim()
                    ? user.lastMessage
                    : (user.caption && user.caption.trim()) || "Hey there!"}
                </p>
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              {user.lastMessageTime && formatTime(user.lastMessageTime)}
              {/* 🔵 Uncomment this if you want unread count badge */}
              {user.unreadCount > 0 && (
                <div className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  {user.unreadCount}
                </div>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
