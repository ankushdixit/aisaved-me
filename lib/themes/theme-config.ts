/**
 * Theme Configuration
 *
 * Defines the available themes and their metadata.
 * Actual CSS variables are defined in globals.css
 */

export type ThemeId = "memphis" | "japanese" | "organic";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  description: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const themes: Record<ThemeId, ThemeConfig> = {
  memphis: {
    id: "memphis",
    name: "Memphis",
    description: "Bold, geometric, and playful",
    preview: {
      primary: "#0066ff",
      secondary: "#ff1493",
      accent: "#ffd700",
    },
  },
  japanese: {
    id: "japanese",
    name: "Zen",
    description: "Minimal, calm, and refined",
    preview: {
      primary: "#1A1A1A",
      secondary: "#FAF8F5",
      accent: "#C41E3A",
    },
  },
  organic: {
    id: "organic",
    name: "Organic",
    description: "Warm, natural, and approachable",
    preview: {
      primary: "#E07A5F",
      secondary: "#81B29A",
      accent: "#F2CC8F",
    },
  },
};

export const defaultTheme: ThemeId = "memphis";

export const themeList = Object.values(themes);
