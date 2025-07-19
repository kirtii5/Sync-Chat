import { Star, Zap, Users, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const featureData = [
  {
    icon: <Zap className="h-8 w-8 text-[#8C52FF]" />,
    title: "Quick & Smooth",
    description:
      "Messages that deliver instantly — whether it's a quick note or a long conversation.",
  },
  {
    icon: <Users className="h-8 w-8 text-[#8C52FF]" />,
    title: "Private by Default",
    description:
      "Your chats are end-to-end encrypted. What you say stays between you and your contact.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-[#8C52FF]" />,
    title: "Clean Interface",
    description:
      "No clutter, no confusion. Just a clean and friendly space to talk and stay connected.",
  },
  {
    icon: <Zap className="h-8 w-8 text-[#8C52FF]" />,
    title: "Instant Messaging",
    description: "Seamlessly chat with anyone anytime without delays.",
  },
  {
    icon: <Star className="h-8 w-8 text-[#8C52FF]" />,
    title: "Secure & Reliable",
    description: "All your messages are encrypted and stored safely.",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-[#8C52FF]" />,
    title: "Rich Communication",
    description: "Send images, files, and voice messages with ease.",
  },
];

export default function Features() {
  return (
    <div className="bg-[#F5F3FE] text-[#1A1A1A] px-6 py-20 max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-3 gap-10">
        {featureData.map((feature, index) => (
          <motion.div
            key={index}
            className="text-center space-y-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}>
            <div className="w-16 h-16 bg-[#E9D5FF] rounded-2xl flex items-center justify-center mx-auto">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="text-[#555]">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
