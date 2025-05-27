"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Building2,
  Brain,
  Database,
  Cpu,
} from "lucide-react";
import AnimatedText from "./animated-text";

const timelineData = [
  {
    id: 1,
    company: " Learned Python , JavaScript , React , Node.js",
    role: " Skill Growth Milestones",
    period: "2022 - present",
    location: "Bihar , India",
    type: "Full-time",
    logo: "/company-a-logo.svg",
    skills: ["JavaScript", "React", "Node.js", "Python"],
  },
  {
    id: 2,
    company: "ML Engineer – Student Marks Predictor",
    role: "Major Personal Projects as Roles",
    period: "2025 - Present",
    location: "Bihar , India",
    type: "Full-time",
    logo: "/company-b-logo.svg",
    skills: ["Python", "Machine Learning", "Data Science"],
  },
];

const skillsData = {
  "Programming Languages": [
    { name: "Python", proficiency: 90 },
    { name: "C++", proficiency: 80 },
    { name: "Java", proficiency: 70 },
    { name: "JavaScript", proficiency: 60 },
    { name: "Rust", proficiency: 50 },
  ],
  "Frameworks/Libraries": [
    { name: "React", proficiency: 95 },
    { name: "Next.js", proficiency: 85 },
    { name: "Node.js", proficiency: 75 },
    { name: "Express.js", proficiency: 65 },
  ],
  Tools: [
    { name: "TensorFlow", proficiency: 98 },
    { name: "PyTorch", proficiency: 88 },
    { name: "Scikit-Learn", proficiency: 78 },
  ],
};

export default function AboutMe() {
  return (
    <section id="about" className="py-12">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AnimatedText
            text="Train. Test. Transform. 🤖✨"
            className="text-3xl md:text-4xl font-bold mb-8 text-center glow-text"
          />

          {/* Profile Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16">
            <div className="md:w-1/3">
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400 glow animate-pulse"></div>
                <Image
                  src="https://1w8r4ifu5ftkirad.public.blob.vercel-storage.com/shubham%20new%20pic-2611amdpK4OXdaiJTxI2ttl7C5N8a8.jpg?w=1920&h=1080&fit=crop&auto=format"
                  alt="Shubham Mehta"
                  fill
                  className="rounded-full object-cover shadow-md border-glow"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <div className="prose max-w-none text-center md:text-left">
                {/* Mobile description */}
                <p className="text-lg leading-relaxed md:hidden text-cyan-100">
                  AI Engineer 🤖 and ML Enthusiast 📊. Building intelligent
                  systems that learn and adapt. From neural networks to computer
                  vision, turning data into insights. 🧠⚡🔍
                </p>
                {/* Desktop description */}
                <div className="hidden md:block">
                  <p className="text-xl mb-4 text-cyan-100">
                    🚀{" "}
                    <strong className="text-cyan-300">
                      Hey, I'm Shubham Mehta!
                    </strong>
                  </p>
                  <p className="mb-4 text-cyan-100">
                    A{" "}
                    <strong className="text-cyan-300">
                      Machine Learning Engineer 🤖
                    </strong>{" "}
                    and{" "}
                    <strong className="text-cyan-300">AI Researcher 🧠</strong>,
                    transforming{" "}
                    <strong className="text-cyan-300">complex data</strong> into{" "}
                    <strong className="text-cyan-300">
                      intelligent solutions
                    </strong>
                    ! Whether it's{" "}
                    <strong className="text-cyan-300">deep learning</strong>,{" "}
                    <strong className="text-cyan-300">computer vision</strong>,
                    or <strong className="text-cyan-300">NLP systems</strong>, I
                    love pushing AI boundaries to new frontiers.
                  </p>
                  <p className="mb-4 text-cyan-100">
                    I spend my days{" "}
                    <strong className="text-cyan-300">
                      training models in PyTorch, TensorFlow, and scikit-learn
                    </strong>
                    —and my nights exploring the latest research papers. 📚 When
                    I'm not coding, I'm probably diving into{" "}
                    <strong className="text-cyan-300">
                      reinforcement learning challenges
                    </strong>
                    , contributing to{" "}
                    <strong className="text-cyan-300">
                      open-source AI projects
                    </strong>
                    , or explaining machine learning concepts to anyone curious
                    enough to ask.
                  </p>
                  <p className="text-cyan-100">
                    Let's{" "}
                    <strong className="text-cyan-300">
                      collaborate, innovate, and solve problems
                    </strong>
                    —because the{" "}
                    <strong className="text-cyan-300">
                      future is intelligent, and I'm helping build it!
                    </strong>{" "}
                    🧠⚡🔍
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text glow-text">
              The Road So Far
              <span className="ml-2 text-white">🛤️</span>
            </h3>
            <div className="relative">
              {/* Vertical Line (only visible on larger screens) */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-cyan-500 to-purple-500 hidden md:block"></div>

              {/* Timeline Items */}
              <div className="space-y-8">
                {timelineData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8 relative`}
                  >
                    {/* Content */}
                    <div className="md:w-1/2 p-6 futuristic-card">
                      <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-16 h-16 md:w-12 md:h-12 rounded-full bg-cyan-900/50 flex items-center justify-center overflow-hidden mb-4 md:mb-0 mx-auto md:mx-0 border-glow">
                          <Image
                            src={item.logo || "/placeholder.svg"}
                            alt={item.company}
                            width={56}
                            height={56}
                            className="rounded-full"
                          />
                        </div>
                        <div className="text-center md:text-left">
                          <h3 className="text-xl font-bold text-cyan-100">
                            {item.role}
                          </h3>
                          <h4 className="text-lg text-cyan-400">
                            {item.company}
                          </h4>
                          <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-200 mt-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{item.period}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-200">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{item.location}</span>
                          </div>
                          <div className="flex items-center justify-center md:justify-start gap-2 text-cyan-200">
                            <Building2 className="w-4 h-4" />
                            <span className="text-sm">{item.type}</span>
                          </div>
                        </div>
                      </div>
                      {item.skills.length > 0 && (
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                          {item.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 text-sm rounded-full bg-cyan-900/50 text-cyan-300 border border-cyan-500/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Timeline Point (hidden on mobile) */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full hidden md:block glow"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center gradient-text glow-text">
              Code Arsenal
              <span className="ml-2 text-white">⚔️</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Object.entries(skillsData).map(([category, skills]) => (
                <div key={category} className="p-6 futuristic-card">
                  <div className="flex items-center mb-4 justify-center md:justify-start">
                    {category === "Programming Languages" && (
                      <Cpu className="w-5 h-5 text-cyan-400 mr-2" />
                    )}
                    {category === "Frameworks/Libraries" && (
                      <Brain className="w-5 h-5 text-cyan-400 mr-2" />
                    )}
                    {category === "Tools" && (
                      <Database className="w-5 h-5 text-cyan-400 mr-2" />
                    )}
                    <h4 className="text-xl font-bold text-cyan-400">
                      {category}
                    </h4>
                  </div>
                  {skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      proficiency={skill.proficiency}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({ name, proficiency }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-cyan-100">{name}</span>
        <span className="text-cyan-300">{proficiency}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${proficiency}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
        />
      </div>
    </div>
  );
}
