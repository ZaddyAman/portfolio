import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Database,
  Cloud,
  Cpu,
  Wrench,
  Server,
  Brain,
} from "lucide-react";

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code2,
      skills: [
        { name: "Python", level: 95 },
        { name: "SQL", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "JavaScript", level: 90 },
        { name: "Java", level: 80 },
        { name: "Cypher", level: 85 },
        { name: "Bash", level: 85 },
      ],
    },
    {
      title: "Web Frameworks",
      icon: Server,
      skills: [
        { name: "React", level: 90 },
        { name: "FastAPI", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "REST APIs", level: 95 },
        { name: "Express", level: 80 },
      ],
    },
    {
      title: "Databases",
      icon: Database,
      skills: [
        { name: "PostgreSQL", level: 95 },
        { name: "MySQL", level: 95 },
        { name: "Neo4j", level: 90 },
        { name: "MongoDB", level: 85 },
        { name: "Redis", level: 85 },
        { name: "ClickHouse", level: 80 },
        { name: "IBM DB2", level: 85 },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      skills: [
        { name: "Docker", level: 90 },
        { name: "AWS", level: 85 },
        { name: "Azure", level: 80 },
        { name: "Kubernetes", level: 80 },
        { name: "CI/CD", level: 85 },
        { name: "Git", level: 95 },
        { name: "Linux", level: 90 },
      ],
    },
    {
      title: "Big Data & Streaming",
      icon: Cpu,
      skills: [
        { name: "Apache Spark", level: 90 },
        { name: "Apache Kafka", level: 90 },
        { name: "Hadoop", level: 80 },
        { name: "Airflow", level: 90 },
        { name: "Streamlit", level: 85 },
        { name: "Plotly Dash", level: 85 },
      ],
    },
    {
      title: "Data Science & ML",
      icon: Brain,
      skills: [
        { name: "pandas", level: 95 },
        { name: "NumPy", level: 95 },
        { name: "scikit-learn", level: 90 },
        { name: "TensorFlow", level: 85 },
        { name: "Prophet", level: 85 },
        { name: "LangChain", level: 85 },
        { name: "RAG Systems", level: 90 },
      ],
    },
  ];

  const languages = [
    { name: "Python", experience: "Advanced" },
    { name: "SQL", experience: "Advanced" },
    { name: "TypeScript", experience: "Intermediate" },
    { name: "JavaScript", experience: "Intermediate" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Skills & Expertise
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive technical skills in data engineering, cloud infrastructure, and AI
            </p>
          </div>

          {/* Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-1000"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Additional Skills */}
          <Card className="p-8 bg-primary/5 mb-16">
            <h2 className="text-2xl font-bold mb-6">Additional Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold mb-3">Data Engineering</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">ETL Pipelines</Badge>
                  <Badge variant="outline">Data Synchronization</Badge>
                  <Badge variant="outline">Stream Processing</Badge>
                  <Badge variant="outline">Data Quality</Badge>
                  <Badge variant="outline">Query Optimization</Badge>
                  <Badge variant="outline">Medallion Architecture</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-3">AI & Machine Learning</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">RAG Systems</Badge>
                  <Badge variant="outline">LLM Integration</Badge>
                  <Badge variant="outline">Anomaly Detection</Badge>
                  <Badge variant="outline">Time Series Forecasting</Badge>
                  <Badge variant="outline">Vector Databases</Badge>
                  <Badge variant="outline">Semantic Search</Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">30+</div>
              <div className="text-muted-foreground">Technologies</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">2+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Records/Day</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Data Consistency</div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}