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
        className="px-4 py-2.5 bg-light-50 border border-dark-900 text-sm font-mono text-dark-900 placeholder:text-dark-600 focus:outline-none focus:bg-white w-64 transition-colors"
        aria-label="Email for newsletter"
      />
      <button
        type="submit"
        className="px-6 py-2.5 bg-dark-900 text-light-50 text-xs font-mono hover:bg-dark-800 transition-all"
      >
        Subscribe
      </button>
    </form>
  );
}

export function Footer() {
  return (
    <footer className="bg-light-100 text-dark-600 border-t border-light-300">
      {/* Main Footer Content - Asymmetric layout */}
      <div className="mx-auto max-w-7xl px-8 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-display font-normal text-dark-900">
              AI Saved Me
            </Link>
            <p className="mt-6 text-sm font-mono leading-relaxed">
              Real people sharing real AI wins.
              <br />
              Verified stories. Actionable prompts.
            </p>

            {/* Social Icons - minimal circles */}
            <div className="flex gap-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-dark-900 text-xs font-mono text-dark-900 hover:bg-dark-900 hover:text-light-50 transition-all"
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
              <h3 className="text-xs font-mono text-dark-900 tracking-wider mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-mono hover:text-dark-900 transition-colors"
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
        <div className="mt-16 pt-12 border-t border-light-300">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
            <div>
              <h3 className="text-xs font-mono text-dark-900 tracking-wider">STAY UPDATED</h3>
              <p className="mt-3 text-sm font-mono">Weekly wins in your inbox</p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-light-300">
        <div className="mx-auto max-w-7xl px-8 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs font-mono text-dark-600">
            <p>&copy; {new Date().getFullYear()} AI Saved Me</p>
            <p>aisaved.me</p>
            <p>Made with AI</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
