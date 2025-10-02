"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
}

function StatCounter({ value, label, suffix = "" }: StatProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Aman Sayyad</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Data Engineer | AI Enthusiast | Building scalable data pipelines and intelligent systems
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-lg">
              <Link href="/projects">
                View Projects <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex gap-4 justify-center"
          >
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://github.com/ZaddyAman"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="w-6 h-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href="https://www.linkedin.com/in/aman-sayyad2003/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:aman2003sayyad@gmail.com" aria-label="Email">
                <Mail className="w-6 h-6" />
              </a>
            </Button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            <StatCounter value={2} label="Years Experience" suffix="+" />
            <StatCounter value={10} label="Data Points/Day" suffix="M+" />
            <StatCounter value={99} label="Data Reliability" suffix=".9%" />
            <StatCounter value={85} label="Quality Improvement" suffix="%" />
          </motion.div>

          {/* Featured Work Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            <Link
              href="/project/coinsight"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  CoinSight
                </h3>
                <p className="text-muted-foreground">
                  Real-time crypto data pipelines with Kafka, Spark & Airflow
                </p>
                <div className="flex items-center text-primary">
                  View Demo <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link
              href="/project/bharatlawai"
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:shadow-lg transition-all"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                  BharatLawAI
                </h3>
                <p className="text-muted-foreground">
                  Production RAG system with 95% accuracy and sub-2s response
                </p>
                <div className="flex items-center text-primary">
                  View Demo <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}