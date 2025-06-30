import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 p-3 bg-muted rounded-2xl text-sm">
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
        <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
      </div>
    </div>
  );
}
