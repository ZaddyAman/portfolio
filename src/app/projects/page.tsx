import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

export default function ProjectsPage() {
  const projects = [
    {
      title: "CoinSight",
      description:
        "Real-time cryptocurrency data engineering platform with Kafka + Spark pipelines processing 1000+ data points/min. Features Medallion architecture (Bronze/Silver/Gold), Airflow orchestration, anomaly detection, and predictive analytics.",
      technologies: [
        "Kafka",
        "Spark",
        "Airflow",
        "Postgres",
        "Streamlit",
        "AWS",
        "Python",
        "Plotly Dash",
      ],
      metrics: [
        "1000+ data points/min",
        "Sub-5s latency",
        "99.9% data delivery",
      ],
      demoLink: "/project/coinsight",
      githubLink: "https://github.com/ZaddyAman/CoinSight",
      featured: true,
      period: "April 2025 – Present",
    },
    {
      title: "BharatLawAI",
      description:
        "Production RAG system with Chain-of-Thought reasoning for Indian legal documents. Built with React/TypeScript frontend and FastAPI backend, featuring streaming responses, JWT/OAuth2 authentication, and hybrid search (semantic + keyword + metadata).",
      technologies: [
        "React",
        "FastAPI",
        "Postgres",
        "LLM API",
        "Python",
        "TypeScript",
        "Pinecone",
        "OpenRouter",
      ],
      metrics: [
        "95% accuracy",
        "Sub-2s response time",
        "90% search precision",
      ],
      demoLink: "/project/bharatlawai",
      githubLink: "https://github.com/ZaddyAman/BharatLawAI",
      liveLink: "https://bharatlaw-frontend.vercel.app/",
      featured: true,
      period: "June 2025 – Present",
    },
  ];

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Showcasing data engineering and AI solutions with real-world impact
            </p>
          </div>

          {/* Featured Projects */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <Card
                  key={index}
                  className="p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{project.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{project.period}</p>
                      </div>
                      <Badge variant="default">Featured</Badge>
                    </div>

                    <p className="text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex flex-wrap gap-4 py-2">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="text-sm font-medium">
                          <span className="text-primary">✓</span> {metric}
                        </div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      {project.demoLink && (
                        <Button asChild>
                          <Link href={project.demoLink}>
                            View Demo <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      )}
                      {project.liveLink && (
                        <Button variant="outline" asChild>
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Site{" "}
                            <ExternalLink className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" asChild>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Card className="p-8 bg-primary/5">
              <h3 className="text-2xl font-bold mb-4">
                Interested in working together?
              </h3>
              <p className="text-muted-foreground mb-6">
                I'm always open to discussing new projects and opportunities
              </p>
              <Button asChild size="lg">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}