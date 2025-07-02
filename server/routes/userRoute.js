const { getPublicContent, getProfile, getOrCreateUser, getAllUser, updateCaption } = require("../controllers/userController");
const { requireAuth, optionalAuth } = require("../middlewares/authMiddleware");
const express = require('express');
const { router } = express();
// Protected route
// router.get("/profile", requireAuth, getProfile);

// // Public route (works for both logged-in and guest users)
// router.get("/feed", optionalAuth, getPublicContent);

router.get('/profile', requireAuth, getOrCreateUser);
router.get('/users', requireAuth, getAllUser);
router.patch("/:id/caption", requireAuth, updateCaption);


module.exports = router;