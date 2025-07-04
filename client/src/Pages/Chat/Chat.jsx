import React, { useState, useEffect, useRef } from "react";
import ChatLayout from "./ChatLayout";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "sonner";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedChat) {
      setMessages([]); // simulate loading messages for selected chat
    }
  }, [selectedChat]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = await getToken();
        const res = await axios.get(
          "http://localhost:4000/api/chats/Allchats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const users = res.data.map((chat) => {
          const otherUser = chat.members.find(
            (member) => member._id !== chat.members[0]?._id
          );
          return {
            _id: otherUser._id,
            username: otherUser.username,
            profileImage: otherUser.profileImage,
            caption: otherUser.caption || "Hey there!",
          };
        });

        setChats(users);
      } catch (error) {
        console.error("❌ Failed to fetch chats:", error);
      }
    };

    if (isLoaded) fetchChats(); // wait until auth is loaded
  }, [isLoaded, getToken]);

  const addUserToChat = (user) => {
    const alreadyExists = chats.find((u) => u._id === user._id);
    if (!alreadyExists) {
      setChats((prev) => [...prev, user]);
    }
    setSelectedChat(user);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "You",
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    toast.success("Your message has been delivered.");

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = {
        id: (Date.now() + 1).toString(),
        content: "Thanks! I'll get back to you.",
        sender: selectedChat.username,
        timestamp: new Date(),
        isOwn: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 1500);
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
      handleSendMessage={handleSendMessage}
      messagesEndRef={messagesEndRef}
      chatUsers={chats}
      addUserToChat={addUserToChat}
    />
  );
}
