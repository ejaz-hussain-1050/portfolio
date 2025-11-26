"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save } from "lucide-react"
import { Label } from "@/components/ui/label"

export function EducationManager() {
  const [education, setEducation] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const res = await fetch("/api/admin/education")
      const data = await res.json()
      setEducation(data)
    } catch (error) {
      console.error("Failed to fetch education:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      await fetch("/api/admin/education", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(education),
      })
      alert("Education updated successfully!")
    } catch (error) {
      console.error("Failed to save education:", error)
    }
  }

  const updateEducation = (index: number, field: string, value: any) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    setEducation(updated)
  }

  const addEducation = () => {
    setEducation([...education, { id: `edu-${Date.now()}`, degree: "", institution: "", period: "", description: "" }])
  }

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Education</h2>
          <p className="text-muted-foreground">Manage your educational background</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addEducation} variant="outline">Add Education</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save All
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {education.map((edu, index) => (
          <Card key={index} className="glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Education #{index + 1}</CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeEducation(index)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree || ""}
                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution || ""}
                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    placeholder="University Name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Period</Label>
                <Input
                  value={edu.period || ""}
                  onChange={(e) => updateEducation(index, "period", e.target.value)}
                  placeholder="2019 - 2023"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={edu.description || ""}
                  onChange={(e) => updateEducation(index, "description", e.target.value)}
                  rows={3}
                  placeholder="Describe your achievements, specializations, etc."
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
