const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  email: String,
  profileImage: String,
  status: {
    type: String,
    default: 'offline'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);