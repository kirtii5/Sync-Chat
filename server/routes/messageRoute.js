// routes/messageRoute.js

const express = require("express");
const router = express.Router();
const { sendMessage, getMessagesByChatId } = require("../controllers/messageController");
const { requireAuth } = require("../middlewares/authMiddleware");
const wrapAsync = require("../utils/wrapAsync");

router.post("/", requireAuth, wrapAsync(sendMessage));
router.get("/:chatId", requireAuth, wrapAsync(getMessagesByChatId));

module.exports = router;
