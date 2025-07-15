import React from "react";
import { useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { useUserProfile } from "@/components/UserProfileContext";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";

export function UserMenu() {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const { profile } = useUserProfile();
  const initials = profile?.first_name?.[0]?.toUpperCase() || "U";

  // ✅ Dynamic check for Clerk image
  const isClerkDefaultImage = (url) =>
    typeof url === "string" && url.includes("img.clerk.com");

  const profileImageToUse =
    profile?.profileImage && !isClerkDefaultImage(profile.profileImage)
      ? profile.profileImage
      : undefined;

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-8 h-8 cursor-pointer">
          <AvatarImage
            src={profileImageToUse}
            alt="User"
            className="object-cover"
          />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/profile")}>
          <User className="h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/settings")}>
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="flex items-center gap-2 text-red-500 cursor-pointer"
          onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
