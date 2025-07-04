// components/UserCard.jsx
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function UserCard({ user, onSelect }) {
  return (
    <div
      className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
      onClick={onSelect}>
      <Avatar>
        <AvatarImage src={user.profileImage || "/placeholder.svg"} />
        <AvatarFallback>{user.username?.[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-medium">{user.username}</p>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}
