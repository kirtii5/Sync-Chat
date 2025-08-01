import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import LandingPage from "./Pages/LandingPage";
import "./App.css";
import Chat from "./Pages/Chat/Chat";
import Features from "./Pages/Features";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Navbar from "./components/ui/Navbar";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";

// Wrapper component to use hooks outside Router
function AppWrapper() {
  const location = useLocation();

  // Routes where Navbar should not be displayed
  const noNavbarRoutes = ["/chat", "/profile"];

  return (
    <>
      <Toaster position="top-center" richColors />
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <div className="auth-container">
              <SignIn afterSignInUrl="/profile" />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="auth-container">
              <SignUp afterSignUpUrl="/profile" />
            </div>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppWrapper />
    </Router>
  );
}

export default App;
