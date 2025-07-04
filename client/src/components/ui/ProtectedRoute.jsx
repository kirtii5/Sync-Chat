import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoute({ children }) {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk has loaded

    if (!isSignedIn && !hasRedirected) {
      setHasRedirected(true); // Prevent repeated redirection
      toast.error("You need to login/signup first");

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: { from: location.pathname },
        });
      }, 1500);
    }
  }, [isSignedIn, isLoaded, hasRedirected, navigate, location]);

  if (!isLoaded) return null;
  if (!isSignedIn) return null;

  return children;
}
