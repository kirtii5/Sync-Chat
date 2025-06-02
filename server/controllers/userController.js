// Import the getAuth function from Clerk SDK
// This function helps extract authenticated user details from the request
const { getAuth } = require("@clerk/clerk-sdk-node");

// Controller for a protected route - requires the user to be logged in
const getProfile = (req, res) => {
  // Extract the userId from the authenticated request using Clerk
  const { userId } = getAuth(req);

  // Respond with a message including the userId
  res.json({ message: `Hello User ${userId}` });
};

// Controller for a public route - accessible to both guests and logged-in users
const getPublicContent = (req, res) => {
  // Check if the request has a logged-in user
  if (req.auth?.userId) {
    // If logged in, greet them with their userId
    res.json({ message: `Welcome back, User ${req.auth.userId}` });
  } else {
    // If not logged in, show a generic guest message
    res.json({ message: "Hello guest, this is public content." });
  }
};

// Export both controllers so they can be used in route files
module.exports = { getProfile, getPublicContent };
