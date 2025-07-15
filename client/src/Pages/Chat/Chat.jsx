import React, { useState, useEffect, useRef } from "react";
import ChatLayout from "./ChatLayout";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserMongoId, setCurrentUserMongoId] = useState(null);
  const messagesEndRef = useRef(null);
  const { getToken, userId } = useAuth();
  const { user, isLoaded } = useUser();
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:4000");
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isLoaded && userId) fetchChats();
  }, [isLoaded, userId]);

  useEffect(() => {
    if (selectedChat && currentUserMongoId) {
      fetchMessages(selectedChat.chatId);
      socket.current.emit("join_chat", selectedChat.chatId);

      setChats((prev) =>
        prev.map((chat) =>
          chat.chatId === selectedChat.chatId
            ? { ...chat, unreadCount: 0 }
            : chat
        )
      );
    }
  }, [selectedChat, currentUserMongoId]);

  useEffect(() => {
    socket.current.on("new_message", (message) => {
      const isOwn = message.sender === currentUserMongoId;

      // ✅ Add message to active chat
      if (selectedChat?.chatId === message.chatId) {
        setMessages((prev) => [
          ...prev,
          {
            ...message,
            isOwn,
            content: message.text,
            timestamp: message.createdAt,
          },
        ]);
      }

      // ✅ Update chat list
      setChats((prevChats) => {
        const updatedChats = prevChats.map((chat) => {
          if (chat.chatId === message.chatId) {
            const isActiveChat = selectedChat?.chatId === chat.chatId;
            return {
              ...chat,
              lastMessage: message.text,
              lastMessageTime: message.createdAt,
              unreadCount: isActiveChat ? 0 : (chat.unreadCount || 0) + 1,
            };
          }
          return chat;
        });

        return [...updatedChats].sort(
          (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
        );
      });

      // ✅ Also update selectedChat (for sidebar preview)
      if (selectedChat?.chatId === message.chatId) {
        setSelectedChat((prev) => ({
          ...prev,
          lastMessage: message.text,
          lastMessageTime: message.createdAt,
        }));
      }
    });

    return () => {
      socket.current.off("new_message");
    };
  }, [selectedChat, currentUserMongoId]);

  const fetchMessages = async (chatId) => {
    try {
      const token = await getToken();
      const res = await axios.get(
        `http://localhost:4000/api/message/${chatId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const fetched = res.data.map((msg) => ({
        ...msg,
        isOwn: msg.sender?._id === currentUserMongoId,
        content: msg.text,
        timestamp: msg.createdAt,
      }));

      setMessages(fetched);
    } catch (err) {
      console.error("❌ Fetch messages failed:", err);
    }
  };

  const fetchChats = async () => {
    try {
      const token = await getToken();
      const res = await axios.get("http://localhost:4000/api/chats/Allchats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rawChats = res.data;
      const myEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

      const formatted = rawChats
        .map((chat) => {
          const me = chat.members.find(
            (m) => m.email.toLowerCase() === myEmail
          );
          const other = chat.members.find(
            (m) => m.email.toLowerCase() !== myEmail
          );
          if (!me || !other) return null;
          setCurrentUserMongoId(me._id);

          return {
            _id: other._id,
            username: other.username,
            profileImage: other.profileImage,
            caption: other.caption || "Hey there!",
            chatId: chat._id,
            lastMessage: chat.lastMessage?.text ?? "",
            lastMessageTime: chat.lastMessage?.createdAt || chat.updatedAt,
            unreadCount: 0,
          };
        })
        .filter(Boolean)
        .sort(
          (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
        );

      setChats(formatted);
    } catch (err) {
      console.error("❌ Fetch chats failed:", err);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;

    try {
      const token = await getToken();
      const res = await axios.post(
        "http://localhost:4000/api/message",
        {
          chatId: selectedChat.chatId,
          text: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const saved = res.data;

      setMessages((prev) => [
        ...prev,
        {
          ...saved,
          isOwn: true,
          content: saved.text,
          timestamp: saved.createdAt,
        },
      ]);

      socket.current.emit("send_message", {
        ...saved,
        chatId: selectedChat.chatId,
      });

      setNewMessage("");
    } catch (err) {
      console.error("❌ Message send failed:", err);
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
      isTyping={false}
      setIsTyping={() => {}}
      messagesEndRef={messagesEndRef}
      chatUsers={chats}
      setChats={setChats}
      fetchChats={fetchChats}
      handleSendMessage={handleSendMessage}
    />
  );
}
