const {createChat, getChatsForUser} = require("../controllers/chatController");
const { requireAuth } = require("../middlewares/authMiddleware");
const express = require('express');
const { router } = express();

router.post("/chat", requireAuth, createChat);
router.get("/Allchats", requireAuth, getChatsForUser);

module.exports = router;
