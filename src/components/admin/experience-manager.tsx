"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Save } from "lucide-react"
import { Label } from "@/components/ui/label"

export function ExperienceManager() {
  const [experiences, setExperiences] = useState<any[]>([])
  const [editing, setEditing] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/admin/experience")
      const data = await res.json()
      setExperiences(data)
    } catch (error) {
      console.error("Failed to fetch experiences:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const method = editing.id && experiences.find(e => e.id === editing.id) ? "PUT" : "POST"
      const res = await fetch("/api/admin/experience", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      })

      if (res.ok) {
        await fetchExperiences()
        setEditing(null)
      }
    } catch (error) {
      console.error("Failed to save experience:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return

    try {
      await fetch(`/api/admin/experience?id=${id}`, { method: "DELETE" })
      await fetchExperiences()
    } catch (error) {
      console.error("Failed to delete:", error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Experience</h2>
          <p className="text-muted-foreground">Manage your work experience</p>
        </div>
        <Button onClick={() => setEditing({ achievements: [] })}>
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      {editing && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>{editing.id ? "Edit Experience" : "New Experience"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input
                  value={editing.company || ""}
                  onChange={(e) => setEditing({ ...editing, company: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input
                  value={editing.position || ""}
                  onChange={(e) => setEditing({ ...editing, position: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Period</Label>
              <Input
                value={editing.period || ""}
                onChange={(e) => setEditing({ ...editing, period: e.target.value })}
                placeholder="2023 - Present"
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editing.description || ""}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Achievements (one per line)</Label>
              <Textarea
                value={editing.achievements?.join("\n") || ""}
                onChange={(e) => setEditing({ ...editing, achievements: e.target.value.split("\n").filter(Boolean) })}
                rows={4}
              />
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
        {experiences.map((exp) => (
          <Card key={exp.id} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{exp.company} - {exp.position}</CardTitle>
                  <CardDescription>{exp.period}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => setEditing(exp)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(exp.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{exp.description}</p>
              <ul className="list-disc list-inside text-sm space-y-1">
                {exp.achievements?.map((achievement: string, i: number) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
