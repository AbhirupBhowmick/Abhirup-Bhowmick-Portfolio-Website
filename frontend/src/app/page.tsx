import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import ArchitectureLab from "@/components/ArchitectureLab";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import GitHubActivity from "@/components/GitHubActivity";
import AIAssistant from "@/components/AIAssistant";
import ResumeHub from "@/components/ResumeHub";
import ContactPortal from "@/components/ContactPortal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <ArchitectureLab />
      <ExperienceTimeline />
      <GitHubActivity />
      <AIAssistant />
      <ResumeHub />
      <ContactPortal />
      
      <footer className="w-full py-12 border-t border-white/5 bg-[#09090b]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ABHIRUP_LAB. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            {["GITHUB", "LINKEDIN", "DOCS", "SOURCE"].map((link) => (
              <a key={link} href="#" className="text-xs font-semibold tracking-widest text-gray-500 hover:text-white transition-colors uppercase">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
