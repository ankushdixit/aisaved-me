"use client";

import { useTheme } from "@/lib/themes";
import { Testimonials as MemphisTestimonials } from "./memphis/Testimonials";
import { Testimonials as JapaneseTestimonials } from "./japanese/Testimonials";
import { Testimonials as OrganicTestimonials } from "./organic/Testimonials";

export function Testimonials() {
  const { theme, mounted } = useTheme();

  if (!mounted) {
    return <MemphisTestimonials />;
  }

  switch (theme) {
    case "japanese":
      return <JapaneseTestimonials />;
    case "organic":
      return <OrganicTestimonials />;
    default:
      return <MemphisTestimonials />;
  }
}
