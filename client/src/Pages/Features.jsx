import { Star, Zap, Users, MessageCircle } from "lucide-react";

export default function Features() {
  return (
    <div className="bg-[#F5F3FE] text-[#1A1A1A] px-6 py-20 max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="text-center space-y-10">
          <div className="w-16 h-16 bg-[#E9D5FF] rounded-2xl flex items-center justify-center mx-auto">
            <Zap className="h-8 w-8 text-[#8C52FF]" />
          </div>
          <h3 className="text-xl font-semibold">Quick & Smooth</h3>
          <p className="text-[#555]">
            Messages that deliver instantly — whether it's a quick note or a
            long conversation.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#E9D5FF] rounded-2xl flex items-center justify-center mx-auto">
            <Users className="h-8 w-8 text-[#8C52FF]" />
          </div>
          <h3 className="text-xl font-semibold">Private by Default</h3>
          <p className="text-[#555]">
            Your chats are end-to-end encrypted. What you say stays between you
            and your contact.
          </p>
        </div>

        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-[#E9D5FF] rounded-2xl flex items-center justify-center mx-auto">
            <MessageCircle className="h-8 w-8 text-[#8C52FF]" />
          </div>
          <h3 className="text-xl font-semibold">Clean Interface</h3>
          <p className="text-[#555]">
            No clutter, no confusion. Just a clean and friendly space to talk
            and stay connected.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#E9D5FF] rounded-2xl flex items-center justify-center">
            <Zap className="h-8 w-8 text-[#8C52FF]" />
          </div>
          <h2 className="text-xl font-semibold">Instant Messaging</h2>
          <p className="text-[#555]">
            Seamlessly chat with anyone anytime without delays.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#E9D5FF] rounded-2xl flex items-center justify-center">
            <Star className="h-8 w-8 text-[#8C52FF]" />
          </div>
          <h2 className="text-xl font-semibold">Secure & Reliable</h2>
          <p className="text-[#555]">
            All your messages are encrypted and stored safely.
          </p>
        </div>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-[#E9D5FF] rounded-2xl flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-[#8C52FF]" />
          </div>
          <h2 className="text-xl font-semibold">Rich Communication</h2>
          <p className="text-[#555]">
            Send images, files, and voice messages with ease.
          </p>
        </div>
      </div>
    </div>
  );
}
