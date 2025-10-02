import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Calendar } from "lucide-react";

export default function ExperiencePage() {
  const experiences = [
    {
      company: "Digit Insurance",
      role: "Graduate Trainee Engineer",
      period: "May 2024 - Nov 2025",
      location: "India",
      description:
        "Building automated data synchronization pipelines and ETL systems for enterprise-scale insurance operations",
      achievements: [
        "Engineered automated SQL data synchronization pipelines across PostgreSQL, MySQL, IBM DB2 using Bash and Python on Linux — reduced manual reconciliation by 80%, ensured 99.9% data consistency across 50+ tables",
        "Built ETL pipelines processing 10M+ records/day with automated error handling and data quality validation",
        "Optimized complex SQL queries (70% faster, 50% less resource usage)",
        "Administered Neo4j graph DB, automated DB access management via Python + Jira REST API",
      ],
      technologies: [
        "Python",
        "Bash",
        "PostgreSQL",
        "MySQL",
        "IBM DB2",
        "Neo4j",
        "Linux",
        "Jira REST API",
        "ETL",
        "SQL",
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Work Experience
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              My professional journey building scalable data engineering solutions
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-8 relative">
                {/* Timeline dot */}
                <div className="absolute -left-4 top-8 w-8 h-8 bg-primary rounded-full border-4 border-background hidden md:block" />

                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        <h2 className="text-2xl font-bold">{exp.role}</h2>
                      </div>
                      <h3 className="text-xl text-primary font-semibold">
                        {exp.company}
                      </h3>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-1 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground">{exp.description}</p>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">2+</div>
              <div className="text-muted-foreground">Years of Experience</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Records Processed Daily</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Data Consistency</div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}