import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      toast.error("You need to login/signup first");
      navigate("/login", {
        replace: true,
        state: { from: location.pathname },
      });
    }
  }, [isSignedIn, navigate, location]);

  if (!isSignedIn) return null;

  return children;
}
