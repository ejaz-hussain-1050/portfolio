"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Save } from "lucide-react"
import { Label } from "@/components/ui/label"

export function SkillsManager() {
  const [skills, setSkills] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch("/api/admin/skills")
      const data = await res.json()
      setSkills(data)
    } catch (error) {
      console.error("Failed to fetch skills:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await fetch("/api/admin/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skills),
      })
      alert("Skills updated successfully!")
    } catch (error) {
      console.error("Failed to save skills:", error)
    }
  }

  const updateSkill = (index: number, field: string, value: any) => {
    const updated = [...skills]
    updated[index] = { ...updated[index], [field]: value }
    setSkills(updated)
  }

  const addSkill = () => {
    setSkills([...skills, { name: "", level: 50, category: "frontend" }])
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Skills</h2>
          <p className="text-muted-foreground">Manage your skills and proficiency levels</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addSkill} variant="outline">Add Skill</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {skills.map((skill, index) => (
          <Card key={index} className="glass-card">
            <CardContent className="pt-6">
              <div className="grid grid-cols-12 gap-4 items-end">
                <div className="col-span-4 space-y-2">
                  <Label>Skill Name</Label>
                  <Input
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    placeholder="e.g., React"
                  />
                </div>
                <div className="col-span-3 space-y-2">
                  <Label>Category</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={skill.category}
                    onChange={(e) => updateSkill(index, "category", e.target.value)}
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="ai">AI/ML</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>
                <div className="col-span-4 space-y-2">
                  <Label>Level: {skill.level}%</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={skill.level}
                      onChange={(e) => updateSkill(index, "level", parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="col-span-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeSkill(index)}
                  >
                    ×
                  </Button>
                </div>
              </div>
              <Progress value={skill.level} className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
