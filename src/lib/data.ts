import { Code, Server, Database, Brain, Cloud } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  category: "web" | "mobile" | "ai" | "fullstack";
}

export interface Experience {
  id: string;
  company: string;
  logo: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: "frontend" | "backend" | "ai" | "tools";
  icon?: any;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

// Default/fallback data - used on client-side and as fallback on server
export const projects: Project[] = [
  {
    id: "fitcoin",
    title: "Fitcoin",
    description: "A blockchain-based fitness application that rewards users with cryptocurrency for their physical activity. Features real-time tracking and wallet integration.",
    techStack: ["React Native", "Solidity", "Node.js", "Web3.js"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/fitcoin.jpg",
    category: "mobile",
  },
  {
    id: "haggle-ai",
    title: "Haggle AI",
    description: "An AI-powered Shopify integration that negotiates prices with customers in real-time, increasing conversion rates and customer engagement.",
    techStack: ["Next.js", "OpenAI API", "Shopify API", "Python"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/haggle.jpg",
    category: "ai",
  },
  {
    id: "trofi-app",
    title: "Trofi App",
    description: "A restaurant discovery and mapping application helping users find the best local dining experiences with personalized recommendations.",
    techStack: ["React", "Google Maps API", "Firebase", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/trofi.jpg",
    category: "web",
  },
  {
    id: "eateasy",
    title: "EatEasy",
    description: "A comprehensive food delivery platform connecting customers with local home chefs and restaurants. Features real-time order tracking.",
    techStack: ["Flutter", "Node.js", "MongoDB", "Socket.io"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/eateasy.jpg",
    category: "fullstack",
  },
  {
    id: "personality-pixie",
    title: "Personality Pixie",
    description: "An AI-driven mobile app that analyzes user behavior to provide personality insights and daily affirmations.",
    techStack: ["React Native", "TensorFlow.js", "Express", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    imageUrl: "/projects/pixie.jpg",
    category: "ai",
  },
];

export const experiences: Experience[] = [
  {
    id: "aurora",
    company: "Aurora Solutions",
    logo: "/companies/aurora.png",
    position: "Full Stack Developer",
    period: "2023 - Present",
    description: "Leading development of enterprise web applications and AI integrations.",
    achievements: [
      "Architected and deployed a microservices-based platform serving 50k+ users.",
      "Integrated LLMs to automate customer support, reducing ticket volume by 40%.",
      "Mentored junior developers and established code quality standards.",
    ],
  },
  {
    id: "orpai",
    company: "ORPAI",
    logo: "/companies/orpai.png",
    position: "AI/ML Intern",
    period: "2022 - 2023",
    description: "Researched and implemented computer vision models for industrial automation.",
    achievements: [
      "Developed a defect detection model with 98% accuracy using PyTorch.",
      "Optimized model inference time by 3x using TensorRT.",
      "Collaborated with cross-functional teams to deploy models to edge devices.",
    ],
  },
];

export const skills: Skill[] = [
  { name: "Next.js / React", level: 95, category: "frontend", icon: Code },
  { name: "TypeScript", level: 90, category: "frontend", icon: Code },
  { name: "Tailwind CSS", level: 95, category: "frontend", icon: Code },
  { name: "Node.js", level: 85, category: "backend", icon: Server },
  { name: "Python / AI", level: 80, category: "ai", icon: Brain },
  { name: "PostgreSQL", level: 85, category: "backend", icon: Database },
  { name: "AWS", level: 75, category: "tools", icon: Cloud },
  { name: "Docker", level: 80, category: "tools", icon: Server },
];
