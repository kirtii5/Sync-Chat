import { Users, MessageCircleHeart, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className=" bg-[#F5F3FE] text-[#1A1A1A] px-6 py-8">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="text-xl text-[#555] max-w-2xl mx-auto mb-10">
          The modern messaging platform that keeps your conversations
          flowing—fast, secure, and seamless.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-[#E9D5FF] rounded-xl flex items-center justify-center mb-4">
              <MessageCircleHeart className="text-[#8C52FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Why Sync-Chat?</h3>
            <p className="text-[#555]">
              Designed to streamline communication—whether you're coordinating
              with your team or catching up with friends.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-[#E9D5FF] rounded-xl flex items-center justify-center mb-4">
              <Users className="text-[#8C52FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Built for Collaboration
            </h3>
            <p className="text-[#555]">
              Stay in sync with organized channels, smart features, and a
              beautifully responsive interface.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
            <div className="w-12 h-12 bg-[#E9D5FF] rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-[#8C52FF]" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Scalable</h3>
            <p className="text-[#555]">
              We take privacy and performance seriously—built on modern stacks
              that scale as you grow.
            </p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-lg text-[#444] leading-7">
          <p className="mb-4">
            At Sync-Chat, our mission is to simplify your communication needs
            without sacrificing performance or experience. Whether you're
            chatting with a teammate, onboarding a client, or hosting a group
            discussion—everything is built to feel effortless.
          </p>
          <p>
            Backed by user-first design and continuous innovation, Sync-Chat is
            the modern communication layer you've been waiting for.
          </p>
        </div>
      </div>
    </div>
  );
}
