import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export default function ChatSidebar({
  selectedChat,
  setSelectedChat,
  chatUsers,
  addUserToChat,
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const { getToken } = useAuth();

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
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const filtered = res.data.filter((user) =>
          user.username.toLowerCase().includes(search.toLowerCase())
        );
        setResults(filtered);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const delay = setTimeout(fetchUsers, 300);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="flex flex-col h-full border-r border-border bg-card">
      {/* Header */}
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sync-Chat</h2>
        <Button onClick={() => setIsSearchOpen((prev) => !prev)} size="sm">
          +
        </Button>
      </div>

      {/* Search bar (inline) */}
      {isSearchOpen && (
        <div className="px-4 pb-2">
          <Input
            placeholder="Search by username"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <ScrollArea className="flex-1">
        {/* Search results */}
        {isSearchOpen && search.length > 0 && results.length > 0 && (
          <div className="px-4 py-2 border-b border-border">
            {results.map((user) => (
              <div
                key={user._id}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                onClick={() => {
                  addUserToChat(user);
                  setSearch("");
                  setIsSearchOpen(false);
                }}>
                <Avatar>
                  <AvatarImage src={user.profileImage} />
                  <AvatarFallback>{user.username?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {user.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Existing chat users */}
        {chatUsers.length === 0 && (
          <p className="text-sm text-center text-muted-foreground mt-4">
            No chats added yet.
          </p>
        )}
        {chatUsers.map((user) => (
          <div
            key={user._id}
            className={`flex items-center p-3 hover:bg-accent cursor-pointer ${
              selectedChat?._id === user._id ? "bg-accent" : ""
            }`}
            onClick={() => setSelectedChat(user)}>
            <Avatar className="mr-3">
              <AvatarImage src={user.profileImage} />
              <AvatarFallback>{user.username?.[0]}</AvatarFallback>
            </Avatar>
            <div>
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
