import React, { useEffect, useState } from "react";
import { MessageCircle, Users, Search } from "lucide-react";
import { UserMenu } from "@/components/ui/UserMenu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export default function ChatSidebar({
  selectedChat,
  setSelectedChat,
  mockChats,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const{getToken} = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await getToken();
      const res = await axios.get("http://localhost:4000/api/users/allUsers",{
        headers: {
          Authorization: `Bearer ${token}`,
        }}
      );
      setAllUsers(res.data);
    };
    fetchUsers();
  },[getToken]);

  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

   return (
    <div className="w-full md:w-80 border-r border-border flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Sync-Chat</h1>
          </div>
          <div className="flex items-center gap-2">
            <UserMenu />
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1 p-2">
        {filteredUsers.length === 0 ? (
          <p className="text-sm text-muted-foreground px-4">No users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-muted/40"
              onClick={() => setSelectedChat(user)}
            >
              <Avatar>
                <AvatarImage src={user.profileImage || "/placeholder.svg"} />
                <AvatarFallback>
                  {user.username[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-sm truncate">{user.username}</p>
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
}

