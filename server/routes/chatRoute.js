const {createChat, getChatsForUser, deleteChat} = require("../controllers/chatController");
const { requireAuth } = require("../middlewares/authMiddleware");
const wrapAsync = require("../utils/wrapAsync.js");
const express = require('express');
const { router } = express();

router.post("/chat", requireAuth, wrapAsync(createChat));
router.get("/Allchats", requireAuth, wrapAsync(getChatsForUser));
router.delete("/:id", requireAuth, wrapAsync(deleteChat));
// router.post("/removeMember", requireAuth, removeMember);


module.exports = router;
