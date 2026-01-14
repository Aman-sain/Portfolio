
import { Briefcase, Calendar } from "lucide-react";

const experiences = [
    {
        role: "Generative AI Intern",
        company: "NASSCOM",
        period: "June 2025 - July 2025",
        description: "Streamlined scripting workflows using Generative AI, lowering manual effort by 25%. Produced AI-driven incident summaries that shortened debugging time by 30%. Refined prompt structures and automated diagnostics, improving pipeline analysis by 20%."
    },
    {
        role: "Web Developer",
        company: "National Technical Research Organization (NTRO)",
        period: "June 2024 - August 2024",
        description: "Engineered a Docker-based reporting system (Node.js + MongoDB), improving reporting speed by 60%. Unified development and deployment environments, minimizing configuration drift by 90%. Converted manual reporting tasks into digital modules, reducing daily workload by 50%."
    }
];

export default function ExperienceSection() {
    return (
        <section
            id="experience"
            className="min-h-screen flex items-center justify-center p-6 bg-black text-white"
        >
            <div className="max-w-4xl w-full mx-auto">
                <div className="flex items-center space-x-4 mb-16">
                    <Briefcase className="w-8 h-8 text-[#C3E41D]" />
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tighter" style={{ fontFamily: "'Fira Code', monospace" }}>EXPERIENCE</h2>
                </div>

                <div className="relative border-l border-neutral-800 ml-3 md:ml-6 space-y-12">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative pl-8 md:pl-12 group">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[5px] top-2 w-3 h-3 rounded-full bg-neutral-800 group-hover:bg-[#C3E41D] transition-colors duration-300 border border-black"></div>

                            <div className="space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-[#C3E41D] transition-colors duration-300">{exp.role}</h3>
                                    <div className="flex items-center text-sm text-neutral-500 space-x-2 mt-1 md:mt-0">
                                        <Calendar className="w-4 h-4" />
                                        <span>{exp.period}</span>
                                    </div>
                                </div>
                                <div className="text-lg text-neutral-400 font-medium">{exp.company}</div>
                                <p className="text-neutral-500 leading-relaxed max-w-2xl pt-2">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
