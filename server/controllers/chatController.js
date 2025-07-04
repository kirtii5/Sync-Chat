const Chat = require("../models/Chat");
const User = require("../models/User");

// create chat or member
const createChat = async (req, res) => {
  try {
    const currentUserId = req.auth.userId; //from  requireAuth
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

// will be used in future for group chats 
// const removeMember = async(req, res) => {
//   try {
//     let currentUserId = req.auth.userId;
//     const currentUser = await User.findOne({clerkId: currentUserId});
//     let otherUserId = req.body;
//      if (!otherUserId) {
//       return res.status(400).json({ message: "Other user ID is required." });
//     }
//     let chat = Chat.findOne({members:{$all:[currentUser, otherUserId]}});
//     if(!chat) {
//       return res.status(404).json({message:"chat not found"});
//     }

//     chat.members.pull(otherUserId);
//     await chat.save();
//     if(chat.members.length < 2) {
//       await chat.findByIdAndDelete(chat._id);
//       return res.status(200).json({ message: "Member removed & chat deleted as only one member left." });
//     }
//     return res.status(200).json({message: "member deleted successfully", chat});
//   } catch(err) {
//     console.log(err);
//     res.status(500).json({message: "internal server error"});
//   }
// };

//deleting chat for curr user if it want to 
const deleteChat = async(req, res) => {
  try {
    const chatId = await req.params.id;
    const currentUser = req.auth.userId;
    const currentUserDoc = await User.findOne({ clerkId: currentUser });
    const currentUserId = currentUserDoc._id;
    const chat = await Chat.findById(chatId);
    if(!chat) {
      return res.status(404).json({message: "chat not found"});
    }
    if(!chat.members.includes(currentUserId)) {
      return res.status(403).json({ message: "You are not a member of this chat" });
    }
    await chat.deleteOne();
    res.status(200).json({ message: "Chat deleted successfully!" });
  } catch(err) {
    console.log(err);
    res.status(500).json({message: "internal server error"});
  }
}

module.exports = {createChat, getChatsForUser, deleteChat};