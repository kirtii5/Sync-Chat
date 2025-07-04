// components/ChatWindow.jsx
import React from "react";

export default function ChatWindow({ selectedUser }) {
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </div>
    );
  }

  return (
    <div className="flex-1 p-4">
      <h2 className="text-xl font-bold mb-2">
        Chat with {selectedUser.username}
      </h2>
      {/* Chat messages and input will go here */}
    </div>
  );
}
