
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
  level: number;
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

export async function getPortfolioData() {
  if (typeof window !== 'undefined') {
    // Client-side fallback - return empty data
    return {
      projects: [],
      experiences: [],
      skills: [],
      education: []
    };
  }

  try {
    const fs = await import('fs/promises');
    const path = await import('path');
    const dataPath = path.join(process.cwd(), "data", "portfolio-data.json");
    const data = JSON.parse(await fs.readFile(dataPath, "utf-8"));    
    return data;
  } catch (error) {
    console.error("Failed to read portfolio data:", error);
    return {
      projects: [],
      experiences: [],
      skills: [],
      education: []
    };
  }
}
