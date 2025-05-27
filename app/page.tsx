"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  FileText,
  Blocks,
  Cpu,
  Braces,
  MessageSquare,
  PenTool,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Link as ScrollLink } from "react-scroll";
import AboutMe from "@/components/about-me";
import Loading from "@/components/loading";
import EnhancedContact from "@/components/enhanced-contact";
import AnimatedText from "@/components/animated-text";
import ProjectCard3D from "@/components/3d-project-card";

// Dynamically import components that use browser APIs with no SSR
const CustomCursor = dynamic(() => import("@/components/custom-cursor"), {
  ssr: false,
});
const Navbar = dynamic(() => import("@/components/navbar"), { ssr: false });
const SocialIcon = dynamic(() => import("@/components/social-icon"), {
  ssr: false,
});
const ScrollIndicator = dynamic(() => import("@/components/scroll-indicator"), {
  ssr: false,
});
// Import the updated futuristic background
const NeuralNetworkBackground = dynamic(
  () => import("@/components/neural-network-background"),
  { ssr: false }
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Reduced loading time

    return () => clearTimeout(timer);
  }, []);

  // Don't render anything until client-side
  if (!mounted) return null;

  return (
    <AnimatePresence>
      {loading ? (
        <Loading key="loading" />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden"
        >
          <CustomCursor />
          <Navbar />
          <NeuralNetworkBackground />
          <ScrollIndicator />

          {/* Hero Section with AI/ML Theme */}
          <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <div className="container px-4 mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="text-center max-w-4xl mx-auto"
                >
                  <div className="mb-6 inline-block p-2 bg-cyan-900/30 backdrop-blur-sm rounded-full border-glow">
                    <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      AI & Machine Learning Enthusiast
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-blue-400 drop-shadow-sm leading-tight glow-text">
                    Hi! It's Shubham Mehta
                  </h1>

                  <p className="text-xl md:text-2xl mb-10 text-cyan-100 max-w-3xl mx-auto">
                    AI Explorer | ML Developer | Technophile
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <ScrollLink
                      to="work"
                      smooth={true}
                      duration={500}
                      offset={-50}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="ai-button px-8 py-4 text-lg font-medium flex items-center gap-2 cursor-pointer"
                      >
                        <Blocks size={20} />
                        View Projects
                      </motion.button>
                    </ScrollLink>
                    <ScrollLink
                      to="contact"
                      smooth={true}
                      duration={500}
                      offset={-50}
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-900/30 rounded-xl shadow-md transition-all duration-300 flex items-center gap-2 text-lg font-medium cursor-pointer"
                        style={{ boxShadow: "0 0 10px rgba(0, 255, 255, 0.2)" }}
                      >
                        <MessageSquare size={20} />
                        Let's Connect
                      </motion.button>
                    </ScrollLink>
                  </div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="flex justify-center"
                  >
                    <ScrollLink
                      to="about"
                      smooth={true}
                      duration={500}
                      className="cursor-pointer"
                    >
                      <div className="bg-cyan-900/30 backdrop-blur-sm p-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-glow">
                        <PenTool className="text-cyan-400" size={24} />
                      </div>
                    </ScrollLink>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="py-20 bg-gradient-to-b from-gray-900 to-blue-900/50 relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl opacity-30 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl opacity-30 translate-y-1/2"></div>

            <div className="container px-4 mx-auto relative z-10">
              <AboutMe />
            </div>
          </section>

          {/* Services Section */}
          <section
            id="services"
            className="py-20 bg-gray-900/80 backdrop-blur-sm relative"
          >
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
                    EXPERTISE
                  </motion.div>
                  <AnimatedText
                    text="AI & ML Solutions 🧠"
                    className="text-4xl md:text-5xl font-bold mb-6 text-white glow-text"
                  />
                  <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
                    Specialized in developing cutting-edge AI and machine
                    learning solutions that drive innovation and business
                    growth.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <ServiceCard
                    icon={<Blocks className="w-12 h-12 text-cyan-400" />}
                    title="Deep Learning"
                    description="Building and training neural networks for computer vision, NLP, and complex pattern recognition tasks."
                  />
                  <ServiceCard
                    icon={<Cpu className="w-12 h-12 text-purple-400" />}
                    title="Machine Learning Engineering"
                    description="End-to-end ML pipelines from data preparation to model deployment and monitoring."
                  />
                  <ServiceCard
                    icon={<Braces className="w-12 h-12 text-cyan-400" />}
                    title="MLOps & Automation"
                    description="Streamlining ML workflows with CI/CD, containerization, and automated testing."
                  />
                  <ServiceCard
                    icon={<FileText className="w-12 h-12 text-cyan-400" />}
                    title="Data Science"
                    description="Extracting insights from data through statistical analysis, visualization, and predictive modeling."
                  />
                  <ServiceCard
                    icon={<Github className="w-12 h-12 text-purple-400" />}
                    title="Computer Vision"
                    description="Image recognition, object detection, and segmentation for visual data analysis."
                  />
                  <ServiceCard
                    icon={<MessageSquare className="w-12 h-12 text-cyan-400" />}
                    title="NLP & Conversational AI"
                    description="Building intelligent chatbots, sentiment analysis, and text processing systems."
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="work"
            className="py-20 bg-blue-900/30 backdrop-blur-sm relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full filter blur-3xl opacity-30 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full filter blur-3xl opacity-30 translate-y-1/2"></div>

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
                    PROJECTS
                  </motion.div>
                  <AnimatedText
                    text="AI Innovations 🔬"
                    className="text-4xl md:text-5xl font-bold mb-6 text-white glow-text"
                  />
                  <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
                    Explore my portfolio of AI and machine learning projects
                    that showcase innovative solutions to complex problems.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <ProjectCard3D
                    title="Neural Style Transfer"
                    description="A deep learning model that applies the style of one image to the content of another using convolutional neural networks."
                    tags={["PyTorch", "CNN", "Computer Vision"]}
                  />
                  <ProjectCard3D
                    title="Sentiment Analysis API"
                    description="Real-time sentiment analysis of text data using transformer-based models with a RESTful API interface."
                    tags={["NLP", "Transformers", "FastAPI"]}
                  />
                  <ProjectCard3D
                    title="Predictive Maintenance"
                    description="Machine learning system that predicts equipment failures before they occur using sensor data and time series analysis."
                    tags={["Time Series", "IoT", "TensorFlow"]}
                  />
                  <ProjectCard3D
                    title="Recommendation Engine"
                    description="Personalized recommendation system using collaborative filtering and deep learning techniques."
                    tags={["RecSys", "Matrix Factorization", "Neural Nets"]}
                  />
                  <ProjectCard3D
                    title="Object Detection System"
                    description="Real-time object detection and tracking system for video streams using YOLO and DeepSORT algorithms."
                    tags={["YOLO", "Computer Vision", "OpenCV"]}
                  />
                  <ProjectCard3D
                    title="Reinforcement Learning"
                    description="Training agents to play complex games using deep reinforcement learning techniques."
                    tags={["RL", "Deep Q-Learning", "PyTorch"]}
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Contact Section */}
          <EnhancedContact />

          {/* Footer */}
          <footer className="py-16 bg-gray-900 relative">
            <div className="container px-4 mx-auto">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col items-center">
                  <h2 className="text-3xl font-bold text-white mb-6 glow-text">
                    Shubham Mehta
                  </h2>
                  <p className="text-cyan-200 text-center max-w-2xl mb-10">
                    AI & Machine Learning Enthusiast passionate about building
                    intelligent systems that make a difference.
                  </p>

                  <div className="flex flex-wrap justify-center gap-6 mb-10">
                    <SocialIcon
                      icon={<Github size={20} />}
                      href="https://github.com/Shubh-Mehta26-26"
                      label="GitHub"
                    />
                    <SocialIcon
                      icon={<Linkedin size={20} />}
                      href="https://www.linkedin.com/in/shubham-kumar-885411265/"
                      label="LinkedIn"
                    />
                    <SocialIcon
                      icon={<Twitter size={20} />}
                      href="https://x.com/Shubh_mehta26"
                      label="Twitter"
                    />
                    <SocialIcon
                      icon={<MessageSquare size={20} />}
                      href="https://discord.com/users/shubhmehta26"
                      label="Discord"
                    />
                    <SocialIcon
                      icon={<PenTool size={20} />}
                      href="https://medium.com/@shubhmehta2604"
                      label="Medium"
                    />
                  </div>

                  <div className="w-full h-px bg-cyan-900/50 mb-8"></div>

                  <div className="text-center text-cyan-400 text-sm">
                    <p>
                      © {new Date().getFullYear()} Shubham Mehta. All rights
                      reserved.
                    </p>
                    <a
                      href="mailto:shubhmehta2604@gmail.com"
                      className="text-cyan-400 hover:text-cyan-300 mt-2 inline-block"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <motion.div
      className="p-8 rounded-xl futuristic-card text-center h-full flex flex-col"
      whileHover={{
        y: -10,
        boxShadow: "0 20px 40px -15px rgba(0, 255, 255, 0.2)",
      }}
    >
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 rounded-full bg-cyan-900/50 flex items-center justify-center border-glow">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-cyan-200 flex-grow">{description}</p>
    </motion.div>
  );
}
