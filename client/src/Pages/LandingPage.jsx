import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  return (
    <div className="bg-[#F5F3FE] text-[#1A1A1A] w-full overflow-x-hidden">
      <main className="w-full max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}>
            <motion.h1
              className="text-5xl lg:text-6xl font-bold leading-tight"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 200 }}>
              Say Hello to <br />
              <span className="text-[#8C52FF]">Effortless Conversations</span>
            </motion.h1>

            <p className="text-xl text-[#555] max-w-lg">
              Sync-Chat brings you a clutter-free messaging experience — fast,
              secure, and always in sync. No distractions. Just chats.
            </p>

            {isLoaded && user ? (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  size="lg"
                  onClick={() => navigate("/chat")}
                  className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white px-8 py-4 text-lg shadow-md">
                  Go to Chats
                </Button>
              </motion.div>
            ) : (
              <div className="flex space-x-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    size="lg"
                    onClick={() => navigate("/signup")}
                    className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white px-8 py-4 text-lg shadow-md">
                    Try Now
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <a href="/features">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#8C52FF] text-[#8C52FF] px-8 py-4 text-lg">
                      Learn More
                    </Button>
                  </a>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Right: Feature Box */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}>
            <motion.div
              className="w-80 h-96 bg-gradient-to-br from-[#EDE9FE] to-[#D8B4FE] rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 32px rgba(140,82,255,0.3)",
              }}
              transition={{ type: "spring", stiffness: 150 }}>
              <div className="text-center space-y-4">
                <Users className="h-16 w-16 text-[#8C52FF] mx-auto animate-pulse" />
                <p className="text-[#555] font-medium">
                  Built for Everyday Communication
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
