import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video, Info, MoreVertical, Users } from "lucide-react";

export default function ChatHeader({ selectedChat, onBack }) {
  return (
    <div className="p-4 border-b border-border flex items-center justify-between bg-card">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="md:hidden mr-1 text-xl text-muted-foreground">
          ←
        </button>

        <Avatar className="h-9 w-9">
          <AvatarImage src={selectedChat?.profileImage || "/placeholder.svg"} />
          <AvatarFallback>{selectedChat?.username?.[0] || "U"}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="text-sm font-bold">
            {selectedChat?.username || "Unknown User"}
          </h2>
          <p className="text-xs text-muted-foreground">
            {selectedChat?.isOnline ? "Online" : "Last seen recently"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 lg:gap-6 ml-auto">
        <Phone className="w-5 h-5 cursor-pointer" />
        <Video className="w-5 h-5 cursor-pointer" />
        <Info className="w-5 h-5 cursor-pointer" />
        <MoreVertical className="w-5 h-5 cursor-pointer" />
      </div>
    </div>
  );
}
