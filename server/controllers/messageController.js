const Message = require("../models/Message");
const Chat = require("../models/Chat");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/User");

// const sendMessage = async (req, res) => {
//   const senderclerkId = req.auth.userId;
//   const senderInfo = await User.findOne({ clerkId: senderclerkId });
//   const { chatId, text } = req.body;
//   if (!senderInfo) throw new ExpressError(404, "sender not found");
//   if (!chatId)
//     throw new ExpressError(400, "Chat ID required");
//   if (!text)
//     throw new ExpressError(400, "text is required");
//   const message = await Message.create({
//     chatId,
//     sender: senderInfo._id,
//     text,
//   });
//   await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });
//   req.io.to(chatId).emit("new message", message); //All Socket.io clients joined to this chatId room will get the new message instantly.
//   res.status(200).json(message);
// };

const sendMessage = async (req, res) => {
  const senderClerkId = req.auth.userId;
  const senderInfo = await User.findOne({ clerkId: senderClerkId });

  const { chatId, text } = req.body;

  if (!senderInfo) throw new ExpressError(404, "Sender not found");
  if (!chatId) throw new ExpressError(400, "Chat ID required");
  if (!text) throw new ExpressError(400, "Text is required");

  const message = await Message.create({
    chatId,
    sender: senderInfo._id,
    text,
  });

  await Chat.findByIdAndUpdate(chatId, { lastMessage: message._id });

  req.io.to(chatId).emit("new_message", message);

  res.status(200).json(message);
};


const getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 }) // Optional: sort oldest to newest
    .populate("sender", "username _id clerkId"); // Populate sender info

  res.status(200).json(messages);
};


const deleteMessagesForMe = async (req, res) => {
  const { messageIds } = req.body; 
  const userId = req.auth.userId;

  const user = await User.findOne({ clerkId: userId });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const idsArray = Array.isArray(messageIds) ? messageIds : [messageIds];

  for (const messageId of idsArray) {
    const message = await Message.findById(messageId);
    if (!message) continue; 

    if (!message.deletedFor.includes(user._id)) {
      message.deletedFor.push(user._id);
      await message.save();
    }

    const chat = await Chat.findById(message.chatId);
    if (!chat) continue;

    const allMembers = chat.members.map(id => id.toString());
    const whoDeleted = message.deletedFor.map(id => id.toString());

    const everyoneDeleted = allMembers.every(memberId =>
      whoDeleted.includes(memberId)
    );

    if (everyoneDeleted) {
      await Message.findByIdAndDelete(messageId);
    }
  }

  res.json({ success: true, message: "Messages deleted for you" });
};



module.exports = {
  sendMessage,
  getMessagesByChatId,
  deleteMessagesForMe,
};