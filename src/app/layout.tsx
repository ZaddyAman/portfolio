import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";

export const metadata: Metadata = {
  title: "Aman Sayyad - Data Engineer & AI Enthusiast",
  description: "Portfolio of Aman Sayyad, a Data Engineer specializing in scalable data pipelines, AI applications, and real-time analytics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        {children}
      </body>
    </html>
  );
}
