import React from "react";
import { MessageCircle, Users, Search } from "lucide-react";
import { UserMenu } from "@/components/ui/UserMenu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ChatSidebar({
  selectedChat,
  setSelectedChat,
  mockChats,
}) {
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
  );
}
