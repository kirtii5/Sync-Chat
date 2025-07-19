import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./button";
import { MessageCircle, Menu, X, User } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();
  const clerk = useClerk();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#8C52FF] font-semibold transition-colors"
      : "text-[#555] hover:text-[#1A1A1A] transition-colors";

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    clerk.signOut();
    navigate("/");
  };

  return (
    <header className="w-full max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 py-6">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2">
          <MessageCircle className="h-8 w-8 text-[#8C52FF]" />
          <span className="text-2xl font-bold">Sync-Chat</span>
        </NavLink>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/features" className={navLinkClass}>
            Features
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="focus:outline-none">
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoaded && user ? (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                onClick={handleLogout}
                className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white px-6 flex items-center space-x-2 rounded shadow-sm">
                <User className="h-5 w-5" />
                <span>Logout</span>
              </Button>
            </motion.div>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/login")}
                  className="text-[#555] hover:text-[#1A1A1A]">
                  Login
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  onClick={() => navigate("/signup")}
                  className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white px-6 rounded shadow">
                  Sign Up
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-4 space-y-1">
            <div className="flex justify-center space-x-3">
              <NavLink
                to="/features"
                className={navLinkClass}
                onClick={toggleMenu}>
                Features
              </NavLink>
              <NavLink
                to="/about"
                className={navLinkClass}
                onClick={toggleMenu}>
                About
              </NavLink>
              <NavLink
                to="/contact"
                className={navLinkClass}
                onClick={toggleMenu}>
                Contact
              </NavLink>
            </div>

            {isLoaded && user ? (
              <div className="pt-4 flex flex-col gap-2">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white w-full flex items-center space-x-2 rounded">
                    <User className="h-5 w-5" />
                    <span>Logout</span>
                  </Button>
                </motion.div>
              </div>
            ) : (
              <div className="pt-4 flex flex-col gap-2">
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate("/login");
                      toggleMenu();
                    }}
                    className="text-[#555] hover:text-[#1A1A1A] w-full">
                    Login
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Button
                    onClick={() => {
                      navigate("/signup");
                      toggleMenu();
                    }}
                    className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white w-full rounded">
                    Sign Up
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
