"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/ui";
import { Suspense } from "react";

function SubmitErrorContent() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const errorType = searchParams.get("type") || "unknown";
  const errorMessage = searchParams.get("message");

  const errorMessages: Record<string, { title: string; description: string }> = {
    validation: {
      title: "Validation Error",
      description:
        "Some of your submission data was invalid. Please go back and check your entries.",
    },
    network: {
      title: "Connection Error",
      description:
        "We couldn't connect to our servers. Please check your internet connection and try again.",
    },
    server: {
      title: "Server Error",
      description:
        "Something went wrong on our end. Our team has been notified and is working on it.",
    },
    unknown: {
      title: "Submission Failed",
      description:
        "We encountered an unexpected error while processing your story. Please try again.",
    },
  };

  const error = errorMessages[errorType] || errorMessages.unknown;
  const displayMessage = errorMessage || error.description;

  const pageStyles = {
    memphis: "min-h-screen bg-pattern-dots",
    japanese: "min-h-screen bg-rice-paper",
    organic: "min-h-screen bg-cream",
  };

  const containerStyles = {
    memphis: "bg-white border-3 border-black shadow-memphis-lg p-8 md:p-12",
    japanese: "bg-rice-paper border border-light-300 rounded-lg shadow-card p-8 md:p-12",
    organic: "bg-cream border-2 border-sage-light rounded-2xl shadow-soft p-8 md:p-12",
  };

  const iconContainerStyles = {
    memphis:
      "w-20 h-20 mx-auto mb-6 bg-coral rounded-full flex items-center justify-center border-3 border-black",
    japanese: "w-16 h-16 mx-auto mb-6 bg-sakura rounded-full flex items-center justify-center",
    organic:
      "w-20 h-20 mx-auto mb-6 bg-terracotta/20 rounded-full flex items-center justify-center",
  };

  const iconStyles = {
    memphis: "w-10 h-10 text-white",
    japanese: "w-8 h-8 text-hanko-red",
    organic: "w-10 h-10 text-terracotta",
  };

  const titleStyles = {
    memphis: "text-2xl md:text-3xl font-display font-bold text-black text-center mb-4",
    japanese: "text-xl md:text-2xl font-medium text-sumi-black text-center mb-4",
    organic: "text-2xl md:text-3xl font-display font-semibold text-clay text-center mb-4",
  };

  const descriptionStyles = {
    memphis: "text-gray-700 text-center mb-8 max-w-md mx-auto",
    japanese: "text-warm-gray text-center mb-8 max-w-md mx-auto",
    organic: "text-clay-light text-center mb-8 max-w-md mx-auto",
  };

  const infoBoxStyles = {
    memphis: "bg-red-50 border-2 border-coral p-4 mb-8",
    japanese: "bg-light-200 border border-hanko-red/30 rounded-lg p-4 mb-8",
    organic: "bg-terracotta/10 border border-terracotta/30 rounded-xl p-4 mb-8",
  };

  const infoTitleStyles = {
    memphis: "font-display font-bold text-sm uppercase tracking-wide mb-2 text-coral",
    japanese: "font-medium text-sm mb-2 text-hanko-red",
    organic: "font-display font-semibold text-sm mb-2 text-terracotta",
  };

  const infoTextStyles = {
    memphis: "text-sm text-gray-700",
    japanese: "text-sm text-warm-gray",
    organic: "text-sm text-clay-light",
  };

  const primaryButtonStyles = {
    memphis: "btn-memphis py-3 px-6 bg-electric-blue text-white",
    japanese:
      "bg-hanko-red text-white py-3 px-6 rounded-lg hover:bg-hanko-red/90 transition-colors",
    organic:
      "bg-terracotta text-white font-medium py-3 px-6 rounded-full hover:bg-terracotta/90 transition-colors",
  };

  const secondaryButtonStyles = {
    memphis: "btn-memphis py-3 px-6 bg-white text-black",
    japanese:
      "text-sumi-black py-3 px-6 border border-light-300 rounded-lg hover:bg-light-100 transition-colors",
    organic:
      "text-clay font-medium py-3 px-6 border-2 border-sage rounded-full hover:bg-sage-light/50 transition-colors",
  };

  return (
    <div className={pageStyles[theme]}>
      <Navbar />

      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 pt-24 pb-16">
        <div className={cn("max-w-lg w-full", containerStyles[theme])}>
          {/* Error Icon */}
          <div className={iconContainerStyles[theme]}>
            <svg
              className={iconStyles[theme]}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className={titleStyles[theme]}>{error.title}</h1>

          {/* Description */}
          <p className={descriptionStyles[theme]}>{displayMessage}</p>

          {/* Help Box */}
          <div className={infoBoxStyles[theme]}>
            <h2 className={infoTitleStyles[theme]}>Need help?</h2>
            <ul className={cn("space-y-2", infoTextStyles[theme])}>
              <li>• Your draft has been saved automatically</li>
              <li>• Try refreshing the page and submitting again</li>
              <li>• Check your internet connection</li>
              <li>• Contact support if the problem persists</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit" className={primaryButtonStyles[theme]}>
              Try Again
            </Link>
            <Link href="/" className={secondaryButtonStyles[theme]}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SubmitErrorPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}
    >
      <SubmitErrorContent />
    </Suspense>
  );
}
