import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "portfolio-data.json");

export interface PortfolioData {
  projects: any[];
  experiences: any[];
  skills: any[];
  education: any[];
}

export async function readPortfolioData(): Promise<PortfolioData> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Return default data if file doesn't exist
    return {
      projects: [],
      experiences: [],
      skills: [],
      education: [],
    };
  }
}

export async function writePortfolioData(data: PortfolioData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

export async function updateProjects(projects: any[]): Promise<void> {
  const data = await readPortfolioData();
  data.projects = projects;
  await writePortfolioData(data);
}

export async function updateExperiences(experiences: any[]): Promise<void> {
  const data = await readPortfolioData();
  data.experiences = experiences;
  await writePortfolioData(data);
}

export async function updateSkills(skills: any[]): Promise<void> {
  const data = await readPortfolioData();
  data.skills = skills;
  await writePortfolioData(data);
}

export async function updateEducation(education: any[]): Promise<void> {
  const data = await readPortfolioData();
  data.education = education;
  await writePortfolioData(data);
}
