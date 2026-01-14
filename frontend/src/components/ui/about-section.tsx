import { useRef, useEffect, useState } from "react";
import { User, Code } from "lucide-react";

export default function AboutSection() {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                }
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="about"
            className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden"
            style={{ backgroundColor: "hsl(0 0% 4%)", color: "hsl(0 0% 98%)" }}
        >
            <div
                ref={ref}
                className={`max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-lg items-center transition-all duration-1000 transform ${inView ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
            >
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        <User className="w-8 h-8 text-[#C3E41D]" />
                        <h2 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: "'Fira Code', monospace" }}>ABOUT ME</h2>
                    </div>
                    <p className="text-neutral-400 leading-relaxed text-xl">
                        Cloud & DevOps Engineer with hands-on experience in AWS infrastructure design, CI/CD automation and Kubernetes deployments.
                        Currently pursuing B.Tech in Computer Science with specialization in DevOps at UPES, Dehradun.
                    </p>
                    <p className="text-neutral-400 leading-relaxed text-xl">
                        Proficient in building production-ready infrastructure using Terraform, Docker, Kubernetes, and implementing DevSecOps practices.
                        Passionate about cloud-native architectures, GitOps workflows, and SRE principles.
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-[#C3E41D] opacity-10 blur-[100px] rounded-full"></div>
                    <div className="relative bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 p-8 rounded-2xl">
                        <h3 className="text-xl font-bold mb-6 text-[#C3E41D]" style={{ fontFamily: "'Fira Code', monospace" }}>SKILLS</h3>
                        <div className="space-y-4">
                            {[
                                { category: "Cloud", items: "AWS (EC2, VPC, IAM, ALB, ECS, EKS), GCP" },
                                { category: "DevOps", items: "Docker, Kubernetes, Helm, ArgoCD, Terraform, Ansible" },
                                { category: "CI/CD", items: "Jenkins, GitHub Actions, Git" },
                                { category: "DevSecOps", items: "SonarQube, Trivy, Snyk" },
                                { category: "Monitoring", items: "Prometheus, Grafana, CloudWatch" },
                                { category: "Languages", items: "Python, Bash" }
                            ].map((skill, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center space-x-2 text-sm text-neutral-500 uppercase tracking-widest font-semibold">
                                        <Code className="w-4 h-4" />
                                        <span>{skill.category}</span>
                                    </div>
                                    <div className="text-white text-lg">{skill.items}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
