import { Mail, SendHorizonal, User } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, access_key: accessKey }),
    });

    const data = await res.json();
    if (data.success) {
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="bg-[#F5F3FE] text-[#1A1A1A] px-4 py-2">
      <div className="max-w-[500px] mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Get in Touch!</h1>
        <p className="text-center text-[#555] mb-6 text-base">
          We'd love to hear from you. Whether you have a question, feedback, or
          just want to say hi — our inbox is always open.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className=" text-sm font-medium mb-1 flex items-center gap-1">
              <User className="w-4 h-4 text-[#8C52FF]" /> Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C52FF] bg-[#FAF8FF]"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className=" text-sm font-medium mb-1 flex items-center gap-1">
              <Mail className="w-4 h-4 text-[#8C52FF]" /> Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C52FF] bg-[#FAF8FF]"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8C52FF] bg-[#FAF8FF]"
              placeholder="How can we help you?"></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 justify-center bg-[#8C52FF] hover:bg-[#7A45E5] text-white px-6 py-3 rounded-xl w-full text-lg font-medium transition-all">
            <SendHorizonal className="w-5 h-5" /> Send Message
          </button>
        </form>

        {/* Notification */}
        {status.message && (
          <div
            className={`mt-4 text-center text-sm font-medium p-2 rounded-xl ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}
