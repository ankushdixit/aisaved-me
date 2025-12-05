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
        className="px-5 py-3 bg-white border-2 border-sage/30 rounded-full text-sm text-clay placeholder:text-clay-light/50 focus:outline-none focus:border-sage w-64 font-body"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        className="px-7 py-3 bg-terracotta text-white text-sm font-display font-semibold rounded-full hover:bg-terracotta-dark transition-all shadow-soft hover:scale-105"
      >
        Subscribe
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#FFF0DC] to-[#FFE8CC] text-clay-light">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-display font-bold text-clay hover:text-terracotta transition-colors"
            >
              AI Saved Me
            </Link>
            <p className="mt-4 text-sm leading-relaxed font-body">
              Real people sharing real AI wins.
              <br />
              Verified stories. Actionable prompts.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-white/80 rounded-full text-xs text-sage-dark hover:bg-terracotta hover:text-white transition-all shadow-soft hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-sm font-display font-bold text-clay tracking-wide">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-body hover:text-terracotta transition-colors"
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
        <div className="mt-12 pt-8 border-t border-sage/20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-sm font-display font-bold text-clay">STAY UPDATED</h3>
              <p className="mt-1 text-sm font-body">Get weekly wins in your inbox</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sage/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs font-body">
            <p>&copy; {new Date().getFullYear()} AI Saved Me. All rights reserved.</p>
            <p className="text-center">aisaved.me</p>
            <p>Made with AI (of course)</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
