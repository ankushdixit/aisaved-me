"use client";

import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  stories: {
    title: "STORIES",
    links: [
      { label: "Browse All Stories", href: "/stories" },
      { label: "Legal Wins", href: "/stories?category=legal" },
      { label: "Medical Wins", href: "/stories?category=medical" },
      { label: "Featured Stories", href: "/stories?featured=true" },
      { label: "Recent Wins", href: "/stories?sort=recent" },
    ],
  },
  resources: {
    title: "RESOURCES",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Submission Guidelines", href: "/guidelines" },
      { label: "AI Tools Guide", href: "/resources/ai-tools" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  legal: {
    title: "LEGAL",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Medical Disclaimer", href: "/disclaimers#medical" },
      { label: "Legal Disclaimer", href: "/disclaimers#legal" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
};

const socialLinks = [
  { label: "X", href: "https://x.com/aisavedme", icon: "X" },
  { label: "LinkedIn", href: "https://linkedin.com/company/aisavedme", icon: "in" },
  { label: "Facebook", href: "https://facebook.com/aisavedme", icon: "fb" },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription would be handled here
    setEmail("");
  };

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="px-5 py-3 bg-white border-3 border-black text-base text-black placeholder:text-gray-400 focus:outline-none focus:border-[#FF1493] w-64 font-body"
        aria-label="Email for newsletter"
      />
      <button type="submit" className="btn-memphis px-8 py-3 bg-[#0066FF] text-white text-base">
        Subscribe
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#FFF9E6] text-black border-t-4 border-black relative overflow-hidden">
      {/* Memphis decorative shapes */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-[#FF1493] rounded-full border-3 border-black opacity-30" />
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-[#00FF7F] border-3 border-black transform rotate-45 opacity-30" />
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-[#FFD700] border-3 border-black opacity-20" />

      {/* Main Footer Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-[#0066FF] border-3 border-black rounded-full transform -rotate-12" />
              <Link href="/" className="text-2xl font-display font-bold text-black">
                AI Saved Me
              </Link>
            </div>
            <p className="text-base font-body font-bold leading-relaxed">
              Real people sharing real AI wins.
              <br />
              Verified stories. Actionable prompts.
            </p>

            {/* Social Icons - Memphis Style */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, idx) => {
                const colors = ["#0066FF", "#FF1493", "#00FF7F"];
                const rotations = ["-rotate-2", "rotate-2", "-rotate-3"];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 flex items-center justify-center border-3 border-black text-sm font-display font-bold hover:scale-110 transition-transform ${rotations[idx]}`}
                    style={{ backgroundColor: colors[idx] }}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-display font-bold text-black tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-body hover:text-[#0066FF] hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t-3 border-black">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-base font-display font-bold text-black uppercase tracking-wider">
                Stay Updated
              </h3>
              <p className="mt-2 text-base font-body font-bold">Get weekly wins in your inbox</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Divider - Dot pattern */}
      <div className="divider-dots border-t-3 border-black bg-white">
        <span className="bg-[#0066FF]" />
        <span className="bg-[#FF1493]" />
        <span className="bg-[#FFD700]" />
        <span className="bg-[#00FF7F]" />
        <span className="bg-[#FF6B6B]" />
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm font-body font-bold">
            <p>&copy; {new Date().getFullYear()} AI Saved Me. All rights reserved.</p>
            <p className="text-center font-display text-[#FFD700]">aisaved.me</p>
            <p>Made with AI (of course)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
