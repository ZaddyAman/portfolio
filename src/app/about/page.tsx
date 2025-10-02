import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Code, Lightbulb } from "lucide-react";

export default function AboutPage() {
  const achievements = [
    {
      icon: Award,
      title: "Data Engineering Excellence",
      description: "Built ETL pipelines processing 10M+ records/day with 99.9% data consistency",
    },
    {
      icon: Code,
      title: "Full-Stack Expertise",
      description: "Proficient in modern data technologies and cloud platforms",
    },
    {
      icon: Lightbulb,
      title: "Innovation Focused",
      description: "Built multiple AI-powered applications with production-grade RAG systems",
    },
    {
      icon: BookOpen,
      title: "Continuous Learner",
      description: "Always exploring cutting-edge technologies in data engineering and AI",
    },
  ];

  const interests = [
    "Data Engineering",
    "Machine Learning",
    "Real-time Analytics",
    "Cloud Computing",
    "Big Data",
    "AI/LLM Applications",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate about building scalable data solutions that make a difference
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Bio Section */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm a Data Engineer with a passion for creating robust data pipelines and intelligent applications. Currently working at Digit Insurance, I specialize in building automated data synchronization systems, ETL pipelines, and production-grade AI applications.
                </p>
                <p>
                  My journey in tech has been driven by a curiosity about how data flows through systems and how we can harness it to build smarter applications. I've engineered solutions that process millions of records daily, implemented real-time crypto analytics platforms, and built production RAG systems with Chain-of-Thought reasoning.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new data technologies, contributing to open-source projects, or experimenting with the latest developments in AI and machine learning.
                </p>
              </div>
            </Card>

            {/* Achievements */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Key Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <Card key={index} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Education */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold">
                    Bachelor of Technology (B.Tech)
                  </h3>
                  <p className="text-muted-foreground">
                    Pimpri Chinchwad College of Engineering • June 2020 - June 2024
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Focused on Computer Science and Engineering with specialization in Data Engineering and Machine Learning
                  </p>
                </div>
              </div>
            </Card>

            {/* Interests */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Areas of Interest</h2>
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-sm py-2 px-4">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Values */}
            <Card className="p-8 bg-primary/5">
              <h2 className="text-2xl font-bold mb-4">My Approach</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I believe in writing clean, maintainable code that stands the test of time. Every project I work on follows best practices in data engineering and software development, with a strong emphasis on testing, documentation, and scalability.
                </p>
                <p>
                  Collaboration and continuous learning are at the core of my work philosophy. I thrive in environments where knowledge sharing is encouraged, and I'm always eager to learn from experienced colleagues while contributing my own insights.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}