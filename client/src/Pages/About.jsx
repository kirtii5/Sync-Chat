import { Users, MessageCircleHeart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      className="bg-[#F5F3FE] text-[#1A1A1A] px-6 py-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}>
      <div className="max-w-screen-xl mx-auto text-center">
        <motion.p
          className="text-xl text-[#555] max-w-2xl mx-auto mb-10"
          variants={cardVariants}>
          The modern messaging platform that keeps your conversations
          flowing—fast, secure, and seamless.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-8 text-left"
          variants={containerVariants}>
          {[
            {
              icon: <MessageCircleHeart className="text-[#8C52FF]" />,
              title: "Why Sync-Chat?",
              desc: "Designed to streamline communication—whether you're coordinating with your team or catching up with friends.",
            },
            {
              icon: <Users className="text-[#8C52FF]" />,
              title: "Built for Collaboration",
              desc: "Stay in sync with organized channels, smart features, and a beautifully responsive interface.",
            },
            {
              icon: <ShieldCheck className="text-[#8C52FF]" />,
              title: "Secure & Scalable",
              desc: "We take privacy and performance seriously—built on modern stacks that scale as you grow.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
              variants={cardVariants}>
              <div className="w-12 h-12 bg-[#E9D5FF] rounded-xl flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-[#555]">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto text-lg text-[#444] leading-7"
          variants={cardVariants}>
          <p className="mb-4">
            At Sync-Chat, our mission is to simplify your communication needs
            without sacrificing performance or experience.
          </p>
          <p>
            Backed by user-first design and continuous innovation, Sync-Chat is
            the modern communication layer you've been waiting for.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
