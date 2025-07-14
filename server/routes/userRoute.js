const {
  getPublicContent,
  getProfile,
  getOrCreateUser,
  getAllUser,
  updateCaption,
  updateProfileImage,
} = require("../controllers/userController");
const { requireAuth, optionalAuth } = require("../middlewares/authMiddleware");
const express = require("express");
const { router } = express();
const wrapAsync = require("../utils/wrapAsync");
const multer  = require('multer');
const { storage } = require("../cloudConfig")
const upload = multer({storage});
// Protected route
// router.get("/profile", requireAuth, getProfile);

// // Public route (works for both logged-in and guest users)
// router.get("/feed", optionalAuth, getPublicContent);

router.get("/profile", requireAuth, wrapAsync(getOrCreateUser));
router.get("/allUsers", requireAuth, wrapAsync(getAllUser));
router.patch("/:id/caption", requireAuth, wrapAsync(updateCaption));
router.post(
  "/upload-profile",
  requireAuth, 
  upload.single("ProfileImage"),
  wrapAsync(updateProfileImage)
);

// router.patch("/:id/profileImage", requireAuth, wrapAsync(UpdateprofileImage));

module.exports = router;
