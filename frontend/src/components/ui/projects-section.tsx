
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "GitOps Platform on AWS",
        category: "AWS EKS • ArgoCD • Helm",
        image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&q=80&w=2532&ixlib=rb-4.0.3",
        description: "Orchestrated a GitOps workflow using ArgoCD + GitHub Actions to standardize deployments. Applied Helm charting to ensure configuration consistency across all releases. Accelerated deployment cycles by 60% while maintaining reliable rollbacks.",
        date: "October 2025"
    },
    {
        title: "Production-Ready EKS Infrastructure",
        category: "AWS EKS • Terraform • Fargate",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2672&ixlib=rb-4.0.3",
        description: "Architected a secure AWS environment with isolated VPC networks and IAM controls. Leveraged AWS Fargate to optimize compute usage and reduce idle costs by 30%. Executed fully reproducible infrastructure provisioning using Terraform modules.",
        date: "July 2025"
    },
    {
        title: "Secure CI/CD DevOps Pipeline",
        category: "Jenkins • Docker • ECS • DevSecOps",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=2534&ixlib=rb-4.0.3",
        description: "Developed an end-to-end secure CI/CD pipeline for a Flask application using containerized microservices. Integrated SonarQube for static code analysis and Trivy for container vulnerability scanning. Implemented Jenkins-driven blue-green deployments with automated rollback.",
        date: "December 2024"
    }
];

export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="min-h-screen py-24 px-6 bg-[#050505] text-white"
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex items-end justify-between mb-20 border-b border-neutral-800 pb-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4" style={{ fontFamily: "'Fira Code', monospace" }}>SELECTED<br />WORK</h2>
                    </div>
                    <div className="hidden md:block text-neutral-500 text-xl font-light">
                        2024 — 2025
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-y-24">
                    {projects.map((project, index) => (
                        <div key={index} className="group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-6">
                                <div className="absolute inset-0 bg-[#C3E41D]/0 group-hover:bg-[#C3E41D]/10 transition-colors duration-500 z-10"></div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out filter grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white text-black p-2 rounded-full">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="absolute bottom-4 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-xs font-mono bg-black/80 px-3 py-1 rounded text-neutral-300">{project.date}</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-2xl font-bold group-hover:text-[#C3E41D] transition-colors duration-300">{project.title}</h3>
                                    <span className="text-xs font-mono border border-neutral-800 px-2 py-1 rounded text-neutral-400">{project.category}</span>
                                </div>
                                <p className="text-neutral-500 leading-relaxed text-sm max-w-md">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
