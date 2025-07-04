const {createChat} = require("../controllers/chatController");
const { requireAuth } = require("../middlewares/authMiddleware");
const express = require('express');
const { router } = express();

router.post("/chat", requireAuth, createChat);

module.exports = router;
