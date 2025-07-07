const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat", required: true }, // Which chat this message belongs to
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Who sent it
    text: { type: String, required: true }, // The message text
  },
  { timestamps: true }
); // Automatically adds createdAt & updatedAt



module.exports = mongoose.model("Message", messageSchema);
