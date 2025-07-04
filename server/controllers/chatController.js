const Chat = require("../models/Chat");
const User = require("../models/User");

exports.createChat = async (req, res) => {
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
