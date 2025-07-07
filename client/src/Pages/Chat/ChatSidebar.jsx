import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";
import { User, MessageCircle, Search, X } from "lucide-react";
import { UserMenu } from "@/components/ui/UserMenu";

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
          (user) =>
            user.clerkId !== userId &&
            user.username.toLowerCase().includes(search.toLowerCase())
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

      // ✅ Use working endpoint to get or create logged-in user
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

      // ✅ Create or fetch chat with clicked user
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
      };

      setChats((prev) => {
        const exists = prev.find((u) => u._id === newChatUser._id);
        return exists ? prev : [...prev, newChatUser];
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
        <UserMenu />
        <div className="flex justify-center items-center">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold"> Sync-Chat</h1>
        </div>
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
                    src={user.profileImage || undefined}
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
            className={`flex items-center p-3 hover:bg-accent cursor-pointer ${
              selectedChat?._id === user._id ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedChat(user)}>
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user.profileImage || undefined}
                alt={user.username}
                className="object-cover"
              />
              <AvatarFallback className="bg-muted flex items-center justify-center">
                <User className="w-5 h-5 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-3">
              <p className="font-medium">{user.username}</p>
              <p className="text-muted-foreground text-sm">
                {user.caption || "Hey there!"}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
