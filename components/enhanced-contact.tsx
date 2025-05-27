"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Brain, Send, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export default function EnhancedContact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Send the form data to our API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      // Show success message
      setIsSubmitted(true);

      // Check if we're in local development mode
      if (data.message && data.message.includes("Local development mode")) {
        toast.success("Message logged ");
        console.log("Form data logged:", data.data);
      } else {
        toast.success("Message sent successfully!");
      }

      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error.message || "Failed to send message. Please try again.");
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 relative">
      {/* Neural network decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <svg
          viewBox="0 0 1000 200"
          className="absolute top-0 left-0 w-full opacity-10"
        >
          <path
            d="M0,100 Q250,180 500,100 T1000,100"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="data-flow"
          />
          <path
            d="M0,150 Q250,50 500,150 T1000,150"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="2"
            className="data-flow"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFFF" />
              <stop offset="50%" stopColor="#8000FF" />
              <stop offset="100%" stopColor="#00FFFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block px-3 py-1 bg-cyan-900/30 text-cyan-400 rounded-full text-sm font-medium mb-4 border-glow"
            >
              GET IN TOUCH
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-400 glow-text">
              Let's Connect & Collaborate
            </h2>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              Have a project in mind or want to discuss AI and machine learning?
              I'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2">
              <div className="futuristic-card p-8 h-full">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4 border-glow">
                    <Brain className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      AI & ML Enthusiast
                    </h3>
                    <p className="text-cyan-300">Ready to innovate with data</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4 mt-1 border-glow">
                      <Mail className="text-cyan-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:shubhmehta2604@gmail.com"
                        className="text-cyan-300 hover:text-cyan-400 transition-colors"
                      >
                        shubhmehta2604@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4 mt-1 border-glow">
                      <Phone className="text-cyan-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        Phone
                      </h4>
                      <p className="text-cyan-300">+91 9264203428</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4 mt-1 border-glow">
                      <MapPin className="text-cyan-400" size={18} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        Location
                      </h4>
                      <p className="text-cyan-300">Bihar , India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Connect with me
                  </h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/shubham-kumar-885411265"
                      className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-800/50 transition-colors border-glow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </a>
                    <a
                      href="https://x.com/Shubh_mehta26"
                      className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-800/50 transition-colors border-glow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/shubh_mehta26?igsh=bGdyNDBpNW5qemdz"
                      className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-800/50 transition-colors border-glow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="https://www.instagram.com/shubh_mehta26?igsh=bGdyNDBpNW5qemdz"
                      className="w-10 h-10 rounded-full bg-cyan-900/50 flex items-center justify-center text-cyan-400 hover:bg-cyan-800/50 transition-colors border-glow"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <div className="futuristic-card p-8">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Send me a message
                </h3>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cyan-900/30 border border-cyan-500/30 rounded-lg p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-cyan-900/50 rounded-full flex items-center justify-center mx-auto mb-4 border-glow">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-400"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      Message Sent Successfully!
                    </h4>
                    <p className="text-cyan-300">
                      Thank you for reaching out. I'll get back to you as soon
                      as possible.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {error && (
                      <div className="mb-6 bg-red-900/30 border border-red-500/30 rounded-lg p-4 flex items-start">
                        <AlertCircle
                          className="text-red-400 mr-3 mt-0.5 flex-shrink-0"
                          size={18}
                        />
                        <div>
                          <p className="text-red-300 font-medium">
                            There was a problem sending your message
                          </p>
                          <p className="text-red-400 text-sm mt-1">{error}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-cyan-300 mb-2 text-sm"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          className="w-full bg-cyan-900/30 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                          placeholder=""
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-cyan-300 mb-2 text-sm"
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full bg-cyan-900/30 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                          placeholder=""
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="subject"
                        className="block text-cyan-300 mb-2 text-sm"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className="w-full bg-cyan-900/30 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        placeholder="How can I help you?"
                        required
                      />
                    </div>

                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-cyan-300 mb-2 text-sm"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full bg-cyan-900/30 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        placeholder="Your message here..."
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full ai-button py-3 px-6 rounded-lg flex items-center justify-center transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <Send className="mr-2" size={18} />
                      )}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    <div className="mt-4 text-center text-cyan-400 text-sm">
                      <p>
                        {process.env.EMAIL_USER ? "Email is configured" : ""}
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
