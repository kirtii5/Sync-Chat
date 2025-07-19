// routes/messageRoute.js

const express = require("express");
const router = express.Router();
const { sendMessage, getMessagesByChatId, deleteMessagesForMe} = require("../controllers/messageController");
const { requireAuth } = require("../middlewares/authMiddleware");
const wrapAsync = require("../utils/wrapAsync");

router.post("/", requireAuth, wrapAsync(sendMessage));
router.get("/:chatId", requireAuth, wrapAsync(getMessagesByChatId));
router.post("/deleteForMe", requireAuth,wrapAsync(deleteMessagesForMe));

module.exports = router;
