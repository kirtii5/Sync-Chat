const Chat = require("../models/Chat");
const User = require("../models/User");

// create chat or member
const createChat = async (req, res) => {
  try {
    const currentUserId = req.auth.userId; //from your requireAuth
    const currentUser = await User.findOne({ clerkId: currentUserId });
    const { otherUserId } = req.body;
    if (!otherUserId)
      res.status(401).json({ message: "other user id is required" });

    let chat = await Chat.findOne({
      members: { $all: [currentUser, otherUserId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    chat = await Chat.create({
      members: [currentUser._id, otherUserId],
    });

    return res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

//curr user chats
const getChatsForUser = async(req, res) => {
  try {
    let currentUserId = req.auth.userId;
    const currentUser = await User.findOne({ clerkId: currentUserId });
    let chats = await Chat.find({ members: currentUser}).populate("members", "username email");
    res.status(200).json(chats);
  } catch(err) {
    console.log(err);
    res.status(500).json({message: "internal server error"});
  }
}

module.exports = {createChat, getChatsForUser};