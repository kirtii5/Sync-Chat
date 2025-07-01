import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { useUser } from "@clerk/clerk-react"; // Import Clerk user hook

export default function LandingPage() {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  return (
    <div className="bg-[#F5F3FE] text-[#1A1A1A] w-full overflow-x-hidden">
      {/* Hero Section */}
      <main className="w-full max-w-screen-xl mx-auto px-6 sm:px-8 md:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Say Hello to <br />
              <span className="text-[#8C52FF]">Effortless Conversations</span>
            </h1>
            <p className="text-xl text-[#555] max-w-lg">
              Sync-Chat brings you a clutter-free messaging experience — fast,
              secure, and always in sync. No distractions. Just chats.
            </p>

            {/* Conditionally show buttons */}
            {isLoaded && user ? (
              // User is logged in
              <Button
                size="lg"
                onClick={() => navigate("/chat")}
                className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white px-8 py-4 text-lg">
                Go to Chats
              </Button>
            ) : (
              // User is NOT logged in
              <div className="flex space-x-4">
                <Button
                  size="lg"
                  onClick={() => navigate("/signup")}
                  className="bg-[#8C52FF] hover:bg-[#7A45E5] text-white px-8 py-4 text-lg">
                  Try Now
                </Button>
                <a href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#8C52FF] text-[#8C52FF] px-8 py-4 text-lg">
                    Learn More
                  </Button>
                </a>
              </div>
            )}
          </div>

          <div className="relative flex justify-center">
            <div className="w-80 h-96 bg-gradient-to-br from-[#EDE9FE] to-[#D8B4FE] rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <Users className="h-16 w-16 text-[#8C52FF] mx-auto" />
                <p className="text-[#555] font-medium">
                  Built for Everyday Communication
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
