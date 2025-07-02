// Import Clerk middleware functions from the SDK
const {
  ClerkExpressRequireAuth,   // Middleware that requires user to be authenticated
  ClerkExpressWithAuth,      // Middleware that adds auth info (but doesn't require login)
  getAuth                    // Function to extract userId and sessionId from request
} = require("@clerk/clerk-sdk-node");

// Create an Express middleware that blocks access if the user is NOT authenticated
const requireAuth = ClerkExpressRequireAuth(); 
// --> Use this middleware on routes that should be protected (e.g., /profile)

// Create middleware that allows both guests and authenticated users
const optionalAuth = ClerkExpressWithAuth(); 
// --> Use this on public routes where auth is optional (e.g., /feed)

// Export the middleware and utility function so they can be used in routes
module.exports = { requireAuth, optionalAuth, getAuth };
