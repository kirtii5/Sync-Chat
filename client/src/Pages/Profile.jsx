import React, { useState } from "react";
import { LogOut, Pencil, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("Kirti Choudhary");
  const [status, setStatus] = useState("Living life one message at a time.");
  const [editing, setEditing] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#F5F3FE] flex mt-6 justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center">Profile</h1>

        {/* Avatar with Icon */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[#EDE9FE] flex items-center justify-center border-4 border-[#8C52FF]">
            <User className="w-10 h-10 text-[#8C52FF]" />
          </div>
          <p className="text-sm text-[#8C52FF] mt-2">Change Icon</p>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#555]">Your Name</label>
            <div className="flex items-center gap-2">
              <Input
                className="mt-1"
                value={name}
                disabled={!editing}
                onChange={(e) => setName(e.target.value)}
              />
              <Pencil
                className="w-4 h-4 text-[#8C52FF] cursor-pointer"
                onClick={() => setEditing(!editing)}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#555]">Status</label>
            <Input
              className="mt-1"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!editing}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            variant="outline"
            className="border-[#8C52FF] text-[#8C52FF] flex items-center gap-2 justify-center"
            onClick={() => navigate("/chat")}>
            <MessageSquare className="w-4 h-4" />
            Go to Chats
          </Button>
          <Button
            className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white flex items-center gap-2 justify-center"
            onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
