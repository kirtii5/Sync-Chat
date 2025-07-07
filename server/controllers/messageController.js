const Message = require("../models/Message");
const Chat = require("../models/Chat");
const ExpressError = require("../utils/ExpressError");
const User = require("../models/User");

const sendMessage = async (req, res) => {
  const senderclerkId = req.auth.userId;
  const senderInfo = await User.findOne({ clerkId: senderclerkId });
  const { chatId, text } = req.body;
  if (!senderInfo) throw new ExpressError(404, "sender not found");
  if (!chatId)
    throw new ExpressError(400, "Chat ID required");
  if (!text)
    throw new ExpressError(400, "text is required");
  const message = await Message.create({
    chatId,
    sender: senderInfo._id,
    text,
  });
  req.io.to(chatId).emit("new message", message); //All Socket.io clients joined to this chatId room will get the new message instantly.
  res.status(200).json(message);
};

const getMessagesByChatId = async (req, res) => {
  const { chatId } = req.params;

  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 }) // Optional: sort oldest to newest
    .populate("sender", "username _id clerkId"); // Populate sender info

  res.status(200).json(messages);
};

module.exports = {
  sendMessage,
  getMessagesByChatId,
};