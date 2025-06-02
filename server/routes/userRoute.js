const { getPublicContent, getProfile } = require("../controllers/userController");
const { requireAuth, optionalAuth } = require("../middlewares/authMiddleware");
const express = require('express');
const { router } = express();
// Protected route
router.get("/profile", requireAuth, getProfile);

// Public route (works for both logged-in and guest users)
router.get("/feed", optionalAuth, getPublicContent);

module.exports = router;