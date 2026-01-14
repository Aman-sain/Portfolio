
import { Mail, Linkedin, Github, Phone } from "lucide-react";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="py-32 px-6 bg-black text-white border-t border-neutral-900"
        >
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter" style={{ fontFamily: "'Fira Code', monospace" }}>
                    LET'S WORK <span className="text-[#C3E41D]">TOGETHER</span>
                </h2>

                <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
                    I'm always interested in hearing about new DevOps projects and cloud infrastructure opportunities.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="mailto:amansain2908@gmail.com"
                        className="inline-flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-[#C3E41D] transition-colors duration-300"
                    >
                        <Mail className="w-5 h-5" />
                        <span>Say Hello</span>
                    </a>

                    <a
                        href="tel:+916350644374"
                        className="inline-flex items-center space-x-3 bg-neutral-900 border border-neutral-800 text-white px-8 py-4 rounded-full text-lg font-bold hover:border-[#C3E41D] hover:text-[#C3E41D] transition-colors duration-300"
                    >
                        <Phone className="w-5 h-5" />
                        <span>+91 63506 44374</span>
                    </a>
                </div>

                <div className="flex justify-center items-center space-x-8 pt-12">
                    {[
                        { icon: Linkedin, href: "https://linkedin.com/in/aman-sain-a14667256/", label: "LinkedIn" },
                        { icon: Github, href: "https://github.com/Aman-sain", label: "GitHub" }
                    ].map((social, index) => (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="text-neutral-500 hover:text-[#C3E41D] transition-colors duration-300 transform hover:scale-110"
                        >
                            <social.icon className="w-8 h-8" />
                        </a>
                    ))}
                </div>

                <div className="pt-20 text-neutral-600 font-mono text-sm">
                    © {new Date().getFullYear()} Aman Sain. All rights reserved.
                </div>
            </div>
        </section>
    );
}
