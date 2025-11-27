"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Plus, Save, Trash2, X } from "lucide-react"
import { useEffect, useState } from "react"
import { ImageUpload } from "./image-upload"

export function ProjectsManager() {
  const [projects, setProjects] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/projects")
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error("Failed to fetch projects:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const method = editing.id && projects.find(p => p.id === editing.id) ? "PUT" : "POST"
      const res = await fetch("/api/admin/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })

      if (res.ok) {
        await fetchProjects()
        setEditing(null)
      }
    } catch (error) {
      console.error("Failed to save project:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        await fetchProjects()
      }
    } catch (error) {
      console.error("Failed to delete project:", error)
    }
  }

  const handleAddTech = (tech: string) => {
    if (!tech.trim()) return
    setEditing({
      ...editing,
      techStack: [...(editing.techStack || []), tech.trim()],
    })
  }

  const handleRemoveTech = (index: number) => {
    setEditing({
      ...editing,
      techStack: editing.techStack.filter((_: any, i: number) => i !== index),
    })
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setEditing({ techStack: [], category: "web" })}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      {editing && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{editing.id ? "Edit Project" : "New Project"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editing.title || ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="Project Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={editing.category || "web"}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="ai">AI</option>
                  <option value="fullstack">Full Stack</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                placeholder="Project description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Live URL</Label>
                <Input
                  value={editing.liveUrl || ""}
                  onChange={(e) => setEditing({ ...editing, liveUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <Input
                  value={editing.githubUrl || ""}
                  onChange={(e) => setEditing({ ...editing, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>

            <ImageUpload
              currentImage={editing.imageUrl}
              onImageChange={(url) => setEditing({ ...editing, imageUrl: url })}
              type="project"
              label="Project Image"
            />

            <div className="space-y-2">
              <Label>Tech Stack</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add technology"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTech(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {editing.techStack?.map((tech: string, i: number) => (
                  <Badge key={tech} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTech(i)}>
                    {tech} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => setEditing(project)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech: string) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
