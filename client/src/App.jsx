import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import LandingPage from "./Pages/LandingPage";
import "./App.css";
import "./auth.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <div className="auth-container">
              <SignIn />
            </div>
          }
        />

        <Route
          path="/signup"
          element={
            <div className="auth-container">
              <SignUp />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
