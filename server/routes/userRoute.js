const {
  getPublicContent,
  getProfile,
  getOrCreateUser,
  getAllUser,
  updateCaption,
} = require("../controllers/userController");
const { requireAuth, optionalAuth } = require("../middlewares/authMiddleware");
const express = require("express");
const { router } = express();
const wrapAsync = require("../utils/wrapAsync");
// Protected route
// router.get("/profile", requireAuth, getProfile);

// // Public route (works for both logged-in and guest users)
// router.get("/feed", optionalAuth, getPublicContent);

router.get("/profile", requireAuth, wrapAsync(getOrCreateUser));
router.get("/allUsers", requireAuth, wrapAsync(getAllUser));
router.patch("/:id/caption", requireAuth, wrapAsync(updateCaption));

module.exports = router;
