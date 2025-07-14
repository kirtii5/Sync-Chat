const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    profileImage: {
      type: File,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    username: String,
    email: String,
    profileImage: String,
    first_name: {
      type: String,
      required: true,
    },
    last_name: { type: String , required: true,},
    status: {
      type: String,
      default: "offline",
    },
    caption: {
      type: String,
      default: "hey there!"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
