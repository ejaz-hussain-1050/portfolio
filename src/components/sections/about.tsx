"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skill } from "@/lib/data"
import { motion } from "framer-motion"
import { Brain, Cloud, Code, Server } from "lucide-react"


export function About({ skills }: { skills: Skill[] }) {
  return (
    <section id="about" className="py-20 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I&apos;m a passionate developer with a knack for solving complex problems. 
            My journey bridges the gap between robust software engineering and innovative AI solutions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Skills Section */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {skills?.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium flex items-center gap-2">
                      {skill.category === "frontend" ? <Code className="w-4 h-4 text-primary" /> :
                      skill.category === "backend" ? <Server className="w-4 h-4 text-primary" /> :
                      skill.category === "ai" ? <Brain className="w-4 h-4 text-primary" /> : <Cloud className="w-4 h-4 text-primary" />}
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education & Background */}
          <div className="space-y-8">
            <Card className="glass-card h-full">
              <CardHeader>
                <CardTitle>Education</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="relative pl-6 border-l-2 border-primary/20 pb-8 last:pb-0">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary" />
                  <div className="space-y-2">
                    <h3 className="font-bold">Bachelor of Science in Computer Science</h3>
                    <p className="text-sm text-muted-foreground">University of Technology • 2019 - 2023</p>
                    <p className="text-sm">
                      Graduated with Honors. Specialized in Artificial Intelligence and Software Engineering.
                      Led the university coding club and organized 3 hackathons.
                    </p>
                  </div>
                </div>
                {/* Add more education items if needed */}
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
