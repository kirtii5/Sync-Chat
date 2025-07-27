import React, { useState, useEffect } from "react";
import { LogOut, Pencil, MessageSquare, User, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export default function Profile() {
  const navigate = useNavigate();
  const { getToken, signOut } = useAuth();

  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [caption, setCaption] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(`${SERVER_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setUserId(data._id);
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
        setCaption(data.caption || "");
        if (data.profileImage) {
          setAvatar(data.profileImage);
        }
      } catch (err) {
        console.log("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [getToken]);

  const handleLogout = () => {
    signOut();
    navigate("/");
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("ProfileImage", file);

      const res = await axios.post(
        `${SERVER_URL}/api/users/upload-profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAvatar(res.data.imageUrl);
      alert("Profile image updated successfully!");
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  const handleUpdateCaption = async () => {
    try {
      const token = await getToken();
      await axios.patch(
        `${SERVER_URL}/api/users/${userId}/caption`,
        { caption },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEditing(false);
      alert("Caption updated successfully!");
    } catch (error) {
      console.error("Error updating caption:", error);
      alert("Failed to update caption.");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-[#F5F3FE]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md h-[90%] flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-center mb-4">Profile</h1>

          <div className="flex flex-col items-center mb-4">
            <label htmlFor="avatar-upload" className="cursor-pointer">
              {avatar ? (
                <img
                  src={
                    avatar instanceof File
                      ? URL.createObjectURL(avatar)
                      : avatar
                  }
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

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-[#555]">
                First Name
              </label>
              <Input value={firstName} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-[#555]">
                Last Name
              </label>
              <Input value={lastName} disabled />
            </div>
            <div>
              <label className="text-sm font-medium text-[#555]">Email</label>
              <Input value={email} disabled />
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
              onClick={() => {
                if (editing) {
                  handleUpdateCaption();
                } else {
                  setEditing(true);
                }
              }}>
              <Pencil className="h-4 w-4" />
              {editing ? "Done Editing" : "Edit Caption"}
            </Button>
          </div>
        </div>

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
