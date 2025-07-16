// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Send } from "lucide-react";

// export default function ChatInput({
//   newMessage,
//   setNewMessage,
//   handleSendMessage,
// }) {
//   return (
//     <form
//       onSubmit={(e) => {
//         e.preventDefault(); // 💥 Fixes refresh issue
//         handleSendMessage();
//       }}
//       className="p-4 border-t border-border flex gap-2">
//       <Input
//         placeholder="Type a message..."
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         className="flex-1 rounded-2xl"
//       />
//       <Button type="submit" size="icon" disabled={!newMessage.trim()}>
//         <Send className="h-5 w-5" />
//       </Button>
//     </form>
//   );
// }
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function ChatInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
  socket,
  selectedChat,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative">
      {/* Emoji Picker (toggle visibility) */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
          setShowEmojiPicker(false); // optional: auto-close picker after send
        }}
        className="p-4 border-t border-border flex gap-2 items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <Smile className="w-5 h-5" />
        </Button>

        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            if (socket?.current && selectedChat?.chatId) {
              socket.current.emit("typing", selectedChat.chatId);
            }
          }}
          className="flex-1 rounded-2xl"
        />

        <Button type="submit" size="icon" disabled={!newMessage.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
}
