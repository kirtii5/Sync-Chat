import React, { useState } from "react";
import { LogOut, Pencil, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState("Kirti");
  const [lastName, setLastName] = useState("Choudhary");
  const [email, setEmail] = useState("kirti@example.com");
  const [caption, setCaption] = useState("Living life one message at a time.");
  const [editing, setEditing] = useState(false);

  const handleLogout = () => {
    clerk.signOut();
    navigate("/");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#F5F3FE]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md h-[90%] flex flex-col justify-between">
        {/* Top Section */}
        <div>
          <h1 className="text-xl font-bold text-center mb-4">Profile</h1>

          {/* Avatar */}
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover border-4 border-[#8C52FF]"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#EDE9FE] flex items-center justify-center border-4 border-[#8C52FF]">
                  <User className="w-10 h-10 text-[#8C52FF]" />
                </div>
              )}
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <p className="text-sm text-[#8C52FF] mt-2">
              Upload Profile Picture
            </p>
          </div>

          {/* Fields */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[#555]">
                First Name
              </label>
              <Input
                value={firstName}
                disabled={!editing}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#555]">
                Last Name
              </label>
              <Input
                value={lastName}
                disabled={!editing}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#555]">Email</label>
              <Input
                value={email}
                disabled={!editing}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#555]">Caption</label>
              <Input
                value={caption}
                disabled={!editing}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <Button
              variant="outline"
              className="border-[#8C52FF] text-[#8C52FF] w-full flex items-center justify-center gap-2"
              onClick={() => setEditing(!editing)}>
              <Pencil className="h-4 w-4" />
              {editing ? "Done Editing" : "Edit Info"}
            </Button>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="mt-4 flex flex-col gap-2">
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
