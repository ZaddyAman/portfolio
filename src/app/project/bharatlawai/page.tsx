"use client";

import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Scale,
  Send,
  Loader2,
  FileText,
  Brain,
  Database,
  Sparkles,
  Github,
  ExternalLink,
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  metadata?: {
    documentsSearched?: number;
    relevancyScore?: string;
    processingTime?: string;
  };
}

export default function BharatLawAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to BharatLawAI! I'm an AI assistant trained on Indian legal documents. Ask me anything about Indian law, case precedents, or legal procedures.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat-sandbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
          metadata: data.analysisMetadata,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content:
          "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const sampleQueries = [
    "What is Section 498A IPC?",
    "Explain the concept of bail",
    "What are fundamental rights in India?",
    "Explain Article 21 of Indian Constitution",
  ];

  const handleSampleQuery = (query: string) => {
    setInput(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 pt-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Scale className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">BharatLawAI</h1>
                  <p className="text-muted-foreground mt-1">
                    Production RAG System for Indian Legal Documents
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/ZaddyAman/BharatLawAI"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <a
                    href="https://bharatlaw-frontend.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">FastAPI</Badge>
              <Badge variant="secondary">Postgres</Badge>
              <Badge variant="secondary">LLM API</Badge>
              <Badge variant="secondary">Python</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Pinecone</Badge>
              <Badge variant="secondary">OpenRouter</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold">Chat Sandbox</h2>
                </div>

                {/* Messages */}
                <div className="space-y-4 mb-4 h-96 overflow-y-auto border border-border rounded-lg p-4 bg-muted/20">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border"
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">
                          {message.content}
                        </div>
                        {message.metadata && (
                          <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground space-y-1">
                            <div>
                              📚 Documents searched:{" "}
                              {message.metadata.documentsSearched}
                            </div>
                            <div>
                              🎯 Relevancy: {message.metadata.relevancyScore}
                            </div>
                            <div>
                              ⚡ Processing time:{" "}
                              {message.metadata.processingTime}
                            </div>
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">
                            Analyzing legal documents...
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question about Indian law..."
                    className="min-h-[100px]"
                    disabled={loading}
                  />
                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Query
                      </>
                    )}
                  </Button>
                </form>

                {/* Sample Queries */}
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-2">
                    Try these sample queries:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sampleQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSampleQuery(query)}
                        disabled={loading}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              {/* Features */}
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Key Features
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>
                      Instant analysis of Indian legal documents and statutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>
                      Case law references from Supreme Court and High Courts
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Constitutional provisions and interpretations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>
                      Document summarization and key points extraction
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>Real-time semantic search across legal databases</span>
                  </li>
                </ul>
              </Card>

              {/* Tech Stack */}
              <Card className="p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  Technology
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-semibold mb-1">RAG Architecture</div>
                    <p className="text-muted-foreground">
                      Retrieval-Augmented Generation for accurate legal responses
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Vector Database</div>
                    <p className="text-muted-foreground">
                      Pinecone for semantic search and retrieval
                    </p>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">LLM Integration</div>
                    <p className="text-muted-foreground">
                      GPT-4 with fine-tuning on Indian legal corpus
                    </p>
                  </div>
                </div>
              </Card>

              {/* Stats */}
              <Card className="p-6 bg-primary/5">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Impact
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      10K+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Documents Analyzed
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">
                      Time Savings
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">
                      Law Firms Using
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Project Info */}
          <Card className="p-8 bg-primary/5 mt-6">
            <h2 className="text-2xl font-bold mb-4">About This Project</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="font-semibold text-foreground">
                June 2025 – Present
              </p>
              <p>
                BharatLawAI is a production RAG system with Chain-of-Thought reasoning that achieves 95% accuracy and sub-2s response time using Pinecone vector database and OpenRouter LLM API. The system features a full-stack React/TypeScript + FastAPI architecture with streaming responses, JWT/OAuth2 user management, and PostgreSQL persistence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="font-bold text-foreground mb-1">
                    Architecture
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>• Production RAG system</li>
                    <li>• Chain-of-Thought reasoning</li>
                    <li>• Hybrid search (semantic + keyword + metadata)</li>
                    <li>• Streaming responses</li>
                    <li>• JWT/OAuth2 authentication</li>
                    <li>• PostgreSQL persistence</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">
                    Technology Stack
                  </div>
                  <ul className="space-y-1 text-sm">
                    <li>• React/TypeScript frontend</li>
                    <li>• FastAPI backend</li>
                    <li>• Pinecone vector database</li>
                    <li>• OpenRouter LLM API</li>
                    <li>• PostgreSQL database</li>
                    <li>• Docker containerization</li>
                    <li>• Railway + Vercel deployment</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">Impact</div>
                  <ul className="space-y-1 text-sm">
                    <li>• 95% accuracy achieved</li>
                    <li>• Sub-2s response time</li>
                    <li>• 45% → 90% precision improvement</li>
                    <li>• Production-ready deployment</li>
                    <li>• CDN-optimized frontend</li>
                    <li>• Scalable architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}