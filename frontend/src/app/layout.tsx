import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhirup Bhowmick | AI Systems & Software Engineer",
  description: "Systems Engineer specializing in distributed knowledge graphs, RAG architecture, and production-grade software intelligence.",
  keywords: ["Abhirup Bhowmick", "Software Engineer", "Systems Engineer", "AI Engineer", "Next.js", "Spring Boot", "React Flow", "RAG", "Portfolio"],
  authors: [{ name: "Abhirup Bhowmick" }],
  openGraph: {
    title: "Abhirup Bhowmick | AI Systems & Software Engineer",
    description: "Systems Engineer specializing in distributed knowledge graphs, RAG architecture, and production-grade software intelligence.",
    url: "https://abhirup-bhowmick-portfolio-website.vercel.app",
    siteName: "Abhirup Bhowmick Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhirup Bhowmick | AI Systems & Software Engineer",
    description: "Systems Engineer specializing in distributed knowledge graphs, RAG architecture, and production-grade software intelligence.",
  },
  icons: {
    icon: "/favicon.ico",
  }
};

import SmoothScroll from "@/components/SmoothScroll";
import CommandPalette from "@/components/CommandPalette";
import AuroraBackground from "@/components/ui/AuroraBackground";
import EngineeringGrid from "@/components/ui/EngineeringGrid";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import CursorGlow from "@/components/ui/CursorGlow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`} style={{ scrollBehavior: 'smooth' }}>
      <body className="bg-[#09090b] text-gray-100 min-h-screen flex flex-col selection:bg-white/10 selection:text-white relative">
        <SmoothScroll>
          <AuroraBackground />
          <EngineeringGrid />
          <NoiseOverlay />
          <CursorGlow />
          {children}
          <CommandPalette />
        </SmoothScroll>
      </body>
    </html>
  );
}
