// routes/messageRoute.js

const express = require("express");
const router = express.Router();
const { sendMessage } = require("../controllers/messageController");
const { requireAuth } = require("../middlewares/authMiddleware");
const wrapAsync = require("../utils/wrapAsync");

router.post("/", requireAuth, wrapAsync(sendMessage));

module.exports = router;
