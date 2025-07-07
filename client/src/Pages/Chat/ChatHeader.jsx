import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video, Info, MoreVertical, User } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";

export default function ChatHeader({ selectedChat, onBack }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  const { getToken } = useAuth();

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setShowDropdown(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleDeleteChat = async () => {
  //   try {
  //     const token = getToken();
  //     await axios.delete(
  //       `http://localhost:4000/api/chats/${selectedChat._id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // or pass getToken() from props
  //         },
  //       }
  //     );
  //     toast.success("Chat deleted");
  //     onDelete(); // Notify parent to remove chat
  //   } catch (err) {
  //     toast.error("Failed to delete chat");
  //     console.error(err);
  //   } finally {
  //     setShowDropdown(false);
  //   }
  // };

  return (
    <div className="p-4 border-b border-border flex items-center justify-between bg-card">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="md:hidden mr-1 text-xl text-muted-foreground">
          ←
        </button>

        <Avatar className="h-9 w-9">
          <AvatarImage
            src={selectedChat?.profileImage || undefined}
            alt={selectedChat?.username}
            className="object-cover"
          />
          <AvatarFallback className="bg-muted flex items-center justify-center">
            <User className="w-4 h-4 text-muted-foreground" />
          </AvatarFallback>
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
        <div className="relative" ref={dropdownRef}>
          <MoreVertical
            className="w-5 h-5 cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          />
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 rounded-md bg-white dark:bg-popover shadow-lg border border-border z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded">
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
