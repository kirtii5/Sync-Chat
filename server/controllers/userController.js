const User = require("../models/User");
const axios = require("axios");


const getProfile = (req, res) => {
  const { userId } = req.auth;
  res.json({ message: `Hello User ${userId}` });
};


const getPublicContent = (req, res) => {
  if (req.auth?.userId) {
    res.json({ message: `Welcome back, User ${req.auth.userId}` });
  } else {
    res.json({ message: "Hello guest, this is public content." });
  }
};

//  Clerk se user nikaal ke MongoDB mein save karo
const getOrCreateUser = async (req, res) => {
  try {
    const { userId } = req.auth;

    if (!userId) return res.status(401).json({ message: "Unauthorized user" });

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      const clerkRes = await axios.get(
        `https://api.clerk.dev/v1/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        }
      );

      const clerkUser = clerkRes.data;

      user = await User.create({
        clerkId: clerkUser.id,
        username: clerkUser.username || clerkUser.first_name,
        email: clerkUser.email_addresses[0].email_address,
        profileImage: clerkUser.image_url,
        first_name: clerkUser.first_name,
        last_name: clerkUser.last_name,
      });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateCaption = async(req, res) => {
  try {
    const { caption } = req.body;
    const {userId} = req.auth;
    const user = await User.findOne({ clerkId: userId });
    if(!user) res.json({message: "user not found"});
    user.caption = caption;
    await user.save();
    res.json({ message: "Caption updated successfully", user });
  } catch(err) {
    console.log(err);
    res.status(500).json({message: "internal server error"});
  }
    
} 

// Get all users except self
const getAllUser = async (req, res) => {
  try {
    const { userId } = req.auth;
    const users = await User.find({ clerkId: { $ne: userId } }); //Mujhe sab users do jinke clerkId ka value userId ke equal nahi hai."
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getProfile, getPublicContent, getAllUser, getOrCreateUser, updateCaption };
