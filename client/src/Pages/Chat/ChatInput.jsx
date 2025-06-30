import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function ChatInput({
  newMessage,
  setNewMessage,
  handleSendMessage,
}) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="p-4 border-t border-border flex gap-2">
      <Input
        placeholder="Type a message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 rounded-2xl"
      />
      <Button type="submit" size="icon" disabled={!newMessage.trim()}>
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
}
