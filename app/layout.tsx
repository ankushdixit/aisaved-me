import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TRPCReactProvider } from "@/lib/api";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Saved Me - Real People Winning with AI",
  description:
    "Discover verified stories of real people using AI to win legal battles, get medical answers, and solve financial disputes. Share your own AI success story.",
  keywords: [
    "AI success stories",
    "AI legal help",
    "AI medical diagnosis",
    "ChatGPT success",
    "Claude AI stories",
    "AI consumer victories",
  ],
  authors: [{ name: "AI Saved Me" }],
  creator: "AI Saved Me",
  publisher: "AI Saved Me",
  openGraph: {
    title: "AI Saved Me - Real People Winning with AI",
    description:
      "Verified stories of real people using AI to win legal battles, get medical answers, and solve financial disputes.",
    url: "https://aisaved.me",
    siteName: "AI Saved Me",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Saved Me - Real People Winning with AI",
    description:
      "Verified stories of real people using AI to win legal battles, get medical answers, and solve financial disputes.",
    creator: "@aisavedme",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
