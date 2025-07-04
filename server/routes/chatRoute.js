const {createChat, getChatsForUser, deleteChat} = require("../controllers/chatController");
const { requireAuth } = require("../middlewares/authMiddleware");
const express = require('express');
const { router } = express();

router.post("/chat", requireAuth, createChat);
router.get("/Allchats", requireAuth, getChatsForUser);
router.delete("/:id", requireAuth, deleteChat);
// router.post("/removeMember", requireAuth, removeMember);


module.exports = router;
