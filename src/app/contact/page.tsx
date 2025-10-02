import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Linkedin, Github, MapPin } from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "aman2003sayyad@gmail.com",
      href: "mailto:aman2003sayyad@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9623131841",
      href: "tel:+919623131841",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "aman-sayyad2003",
      href: "https://www.linkedin.com/in/aman-sayyad2003/",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "ZaddyAman",
      href: "https://github.com/ZaddyAman",
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
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              I'm always open to discussing new projects, opportunities, or just having a conversation about data engineering and AI
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <a
                    href={contact.href}
                    target={contact.href.startsWith('http') ? "_blank" : undefined}
                    rel={contact.href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-muted-foreground mb-1">
                        {contact.label}
                      </h3>
                      <p className="text-lg font-medium group-hover:text-primary transition-colors">
                        {contact.value}
                      </p>
                    </div>
                  </a>
                </Card>
              );
            })}
          </div>

          {/* Project Links */}
          <Card className="p-8 bg-primary/5 mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-lg mb-2">CoinSight</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Real-time cryptocurrency data engineering platform
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/ZaddyAman/CoinSight"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">BharatLawAI</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Production RAG system for Indian legal documents
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href="https://github.com/ZaddyAman/BharatLawAI"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <a
                      href="https://bharatlaw-frontend.vercel.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Call to Action */}
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Whether you have a project in mind, want to collaborate, or just want to chat about data engineering and AI, I'd love to hear from you. Feel free to reach out through any of the channels above.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="mailto:aman2003sayyad@gmail.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Email
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a
                  href="https://www.linkedin.com/in/aman-sayyad2003/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5 mr-2" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}