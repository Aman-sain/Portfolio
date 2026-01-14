
import PortfolioHero from "@/components/ui/portfolio-hero";
import AboutSection from "@/components/ui/about-section";
import ExperienceSection from "@/components/ui/experience-section";
import ProjectsSection from "@/components/ui/projects-section";
import ContactSection from "@/components/ui/contact-section";

export default function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@700&family=Antic&display=swap"
      />
      <div className="w-full bg-black min-h-screen">
        <PortfolioHero />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </div>
    </>
  );
}
