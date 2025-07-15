import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.jsx";
import { UserProfileProvider } from "./components/UserProfileContext";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <StrictMode>
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </StrictMode>
  </ClerkProvider>
);
