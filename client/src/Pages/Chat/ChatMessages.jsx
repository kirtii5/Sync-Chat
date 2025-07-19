import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TypingIndicator from "./TypingIndicator";
import { Trash2 } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox";
import { toast } from "react-toastify";

// Format time to hh:mm AM/PM
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export default function ChatMessages({
  messages,
  isTyping,
  messagesEndRef,
  onDeleteMessages,
  currentUserMongoId,
}) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleSelect = (id) => {
    if (!id) return;
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;
    toast.success("Messages deleted!");
    onDeleteMessages(selectedIds);
    setSelectedIds([]);
  };

  return (
    <div className="relative h-full">
      {selectedIds.length > 0 && (
        <div className="absolute top-2 right-4 z-10">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-600 text-sm shadow-lg">
            <Trash2 className="w-4 h-4" />
            Delete ({selectedIds.length})
          </button>
        </div>
      )}

      <ScrollArea className="flex-1 px-4 pt-4 pb-2 overflow-y-auto h-[calc(100vh-160px)]">
        {messages
          .filter((msg) => !msg.deletedFor?.includes(currentUserMongoId))
          .map((msg, index) => {
            const isSelected = selectedIds.includes(msg._id);
            const isOwn = msg.sender?._id === currentUserMongoId || msg.isOwn;

            return (
              <div
                key={`${msg._id || msg.id}-${index}`}
                className={`flex items-center gap-2 group ${
                  isOwn ? "justify-end" : "justify-start"
                } mb-5`}>
                <div
                  className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                    isOwn ? "order-2 ml-2" : "order-1 mr-2"
                  }`}>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleSelect(msg._id)}
                    className="cursor-pointer"
                  />
                </div>

                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                    isOwn
                      ? "bg-primary text-white order-1"
                      : "bg-muted text-muted-foreground order-2"
                  } ${isSelected ? "ring-2 ring-red-400" : ""}`}>
                  {msg.content}
                  <div className="text-[10px] mt-1 text-end">
                    {formatTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            );
          })}

        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </ScrollArea>
    </div>
  );
}
