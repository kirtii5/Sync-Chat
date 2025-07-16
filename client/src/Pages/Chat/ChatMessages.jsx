import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypingIndicator from "./TypingIndicator";

// Format time to hh:mm AM/PM
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function ChatMessages({ messages, isTyping, messagesEndRef }) {
  console.log("🔥 isTyping:", isTyping);

  return (
    <ScrollArea className="flex-1 px-4 pt-4 pb-2 overflow-y-auto h-[calc(100vh-160px)]">
      {messages.map((msg, index) => (
        <div
          key={`${msg._id || msg.id}-${msg.timestamp}-${index}`}
          className={`flex ${
            msg.isOwn ? "justify-end" : "justify-start"
          } mb-5`}>
          <div
            className={`max-w-[80%] p-4 rounded-2xl text-sm ${
              msg.isOwn
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            }`}>
            {msg.content}
            <div className="text-[10px] mt-1 text-end">
              {formatTime(msg.timestamp)}
            </div>
          </div>
        </div>
      ))}

      {isTyping && <TypingIndicator />}

      <div ref={messagesEndRef} />
    </ScrollArea>
  );
}
