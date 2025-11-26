"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, Briefcase, FolderKanban, GraduationCap, Code } from "lucide-react"
import { ProjectsManager } from "./projects-manager"
import { ExperienceManager } from "./experience-manager"
import { SkillsManager } from "./skills-manager"
import { EducationManager } from "./education-manager"

export function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.refresh()
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Manage your portfolio content</p>
          </div>
          <Button variant="outline" onClick={handleLogout} disabled={loading}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl">
            <TabsTrigger value="projects">
              <FolderKanban className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="experience">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills">
              <Code className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="education">
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="experience">
            <ExperienceManager />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager />
          </TabsContent>

          <TabsContent value="education">
            <EducationManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
