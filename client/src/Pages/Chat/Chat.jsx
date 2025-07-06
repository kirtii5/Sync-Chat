import React, { useState, useEffect, useRef } from "react";
import ChatLayout from "./ChatLayout";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const { getToken, userId } = useAuth();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isLoaded && userId) fetchChats();
  }, [isLoaded, userId]);

  // const fetchChats = async () => {
  //   try {
  //     const token = await getToken();
  //     const res = await axios.get("http://localhost:4000/api/chats/Allchats", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     const rawChats = res.data;

  //     const loggedInEmail =
  //       user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  //     const formatted = rawChats
  //       .filter((chat) => {
  //         // Only include chats where the first member is the logged-in user
  //         return chat.members?.[0]?.email === loggedInEmail;
  //       })
  //       .map((chat) => {
  //         const otherUser = chat.members?.[1]; // the other person is at index 1
  //         if (!otherUser) return null;

  //         return {
  //           _id: otherUser._id,
  //           username: otherUser.username || "Unknown",
  //           profileImage: otherUser.profileImage || "",
  //           caption: otherUser.caption || "Hey there!",
  //           clerkId: otherUser.clerkId,
  //           email: otherUser.email,
  //           chatId: chat._id,
  //         };
  //       })
  //       .filter(Boolean); // remove nulls

  //     setChats(formatted);
  //   } catch (err) {
  //     console.error("❌ Error fetching chats:", err);
  //   }
  // };

  const fetchChats = async () => {
    try {
      const token = await getToken();
      const res = await axios.get("http://localhost:4000/api/chats/Allchats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawChats = res.data;

      const loggedInEmail =
        user?.primaryEmailAddress?.emailAddress?.toLowerCase();

      const formatted = rawChats
        .filter((chat) => {
          // show chat if the logged-in user is in members array
          return chat.members?.some((member) => member.email === loggedInEmail);
        })
        .map((chat) => {
          const otherUser = chat.members?.find(
            (m) => m.email !== loggedInEmail
          );
          if (!otherUser) return null;

          return {
            _id: otherUser._id,
            username: otherUser.username || "Unknown",
            profileImage: otherUser.profileImage || "",
            caption: otherUser.caption || "Hey there!",
            clerkId: otherUser.clerkId,
            email: otherUser.email,
            chatId: chat._id,
          };
        })
        .filter(Boolean); // remove nulls
      // remove nulls

      setChats(formatted);
    } catch (err) {
      console.error("❌ Error fetching chats:", err);
    }
  };

  return (
    <ChatLayout
      selectedChat={selectedChat}
      setSelectedChat={setSelectedChat}
      messages={messages}
      setMessages={setMessages}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
      isTyping={isTyping}
      setIsTyping={setIsTyping}
      messagesEndRef={messagesEndRef}
      chatUsers={chats}
      setChats={setChats}
      fetchChats={fetchChats}
    />
  );
}
