// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useClerk } from "@clerk/clerk-react";

// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
// } from "@/components/ui/dropdown-menu";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { LogOut, Settings, User } from "lucide-react";

// export function UserMenu() {
//   const navigate = useNavigate();
//   const { signOut } = useClerk();

//   const handleLogout = async () => {
//     await signOut();
//     navigate("/login");
//   };

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Avatar className="h-9 w-9 cursor-pointer">
//           <AvatarImage src="/avatar.jpg" alt="User Avatar" />
//           <AvatarFallback>U</AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>

//       <DropdownMenuContent className="w-48" align="end">
//         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//         <DropdownMenuSeparator />

//         <DropdownMenuItem
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => navigate("/profile")}>
//           <User className="h-4 w-4" />
//           <span>Profile</span>
//         </DropdownMenuItem>

//         <DropdownMenuItem
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => navigate("/settings")}>
//           <Settings className="h-4 w-4" />
//           <span>Settings</span>
//         </DropdownMenuItem>

//         <DropdownMenuSeparator />

//         <DropdownMenuItem
//           className="flex items-center gap-2 text-red-500 cursor-pointer"
//           onClick={handleLogout}>
//           <LogOut className="h-4 w-4" />
//           <span>Logout</span>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }
