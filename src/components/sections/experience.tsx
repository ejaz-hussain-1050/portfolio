"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Experience } from "@/lib/data"
import { motion } from "framer-motion"

export function Experiences({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="py-20 container mx-auto px-4 bg-slate-50/5 dark:bg-slate-900/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            My professional journey and career highlights.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="glass-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:w-1/4 bg-primary/5 flex flex-col items-center justify-center text-center space-y-4 border-b md:border-b-0 md:border-r border-border">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-background border-2 border-primary/20">
                         {/* Placeholder for logo if image fails to load or isn't provided */}
                         <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground font-bold text-xl">
                            {exp.company.charAt(0)}
                         </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{exp.company}</h3>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                    </div>
                    <div className="p-6 md:w-3/4 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <h4 className="text-xl font-semibold text-primary">{exp.position}</h4>
                      </div>
                      <p className="text-muted-foreground">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
