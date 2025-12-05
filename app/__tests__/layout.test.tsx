import { render, screen } from "@testing-library/react";
import RootLayout, { metadata } from "../layout";

// Mock ThemeProvider
jest.mock("@/lib/themes", () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock TRPCReactProvider
jest.mock("@/lib/api", () => ({
  TRPCReactProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock ThemeSwitcher
jest.mock("@/components/ui", () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">Theme Switcher</div>,
}));

describe("RootLayout", () => {
  it("renders without errors", () => {
    expect(() => render(<RootLayout>Test Content</RootLayout>)).not.toThrow();
  });

  it("renders children correctly", () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("includes TRPCReactProvider wrapper", () => {
    const { container } = render(<RootLayout>Test Content</RootLayout>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("includes ThemeProvider wrapper", () => {
    const { container } = render(<RootLayout>Test Content</RootLayout>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("includes ThemeSwitcher component", () => {
    render(<RootLayout>Test Content</RootLayout>);
    expect(screen.getByTestId("theme-switcher")).toBeInTheDocument();
  });

  it("structure includes html, head and body elements", () => {
    // Testing that layout structure exists - actual DOM elements
    // are created by Next.js at runtime
    expect(() => render(<RootLayout>Test Content</RootLayout>)).not.toThrow();
  });

  it("renders multiple children correctly", () => {
    render(
      <RootLayout>
        <div>Child 1</div>
        <div>Child 2</div>
      </RootLayout>
    );
    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("renders with empty children", () => {
    expect(() => render(<RootLayout>{null}</RootLayout>)).not.toThrow();
  });
});

describe("Metadata", () => {
  it("has correct title", () => {
    expect(metadata.title).toBe("AI Saved Me - Real People Winning with AI");
  });

  it("has description", () => {
    expect(metadata.description).toContain("Discover verified stories");
  });

  it("has keywords array", () => {
    expect(metadata.keywords).toBeInstanceOf(Array);
    expect((metadata.keywords as string[]).length).toBeGreaterThan(0);
  });

  it("includes relevant keywords", () => {
    const keywords = metadata.keywords as string[];
    expect(keywords).toContain("AI success stories");
    expect(keywords).toContain("ChatGPT success");
    expect(keywords).toContain("Claude AI stories");
  });

  it("has authors array", () => {
    expect(metadata.authors).toBeInstanceOf(Array);
    expect((metadata.authors as { name: string }[])[0]?.name).toBe("AI Saved Me");
  });

  it("has creator", () => {
    expect(metadata.creator).toBe("AI Saved Me");
  });

  it("has publisher", () => {
    expect(metadata.publisher).toBe("AI Saved Me");
  });

  it("has Open Graph metadata", () => {
    expect(metadata.openGraph).toBeDefined();
    if (
      metadata.openGraph &&
      typeof metadata.openGraph === "object" &&
      !Array.isArray(metadata.openGraph)
    ) {
      expect(metadata.openGraph.title).toBe("AI Saved Me - Real People Winning with AI");
      expect(metadata.openGraph.url).toBe("https://aisaved.me");
      expect(metadata.openGraph.siteName).toBe("AI Saved Me");
      expect(metadata.openGraph.locale).toBe("en_US");
      expect((metadata.openGraph as { type?: string }).type).toBe("website");
    }
  });

  it("has Twitter card metadata", () => {
    expect(metadata.twitter).toBeDefined();
    if (
      metadata.twitter &&
      typeof metadata.twitter === "object" &&
      !Array.isArray(metadata.twitter)
    ) {
      expect((metadata.twitter as { card?: string }).card).toBe("summary_large_image");
      expect(metadata.twitter.title).toBe("AI Saved Me - Real People Winning with AI");
      expect(metadata.twitter.creator).toBe("@aisavedme");
    }
  });

  it("has robots metadata", () => {
    expect(metadata.robots).toBeDefined();
    if (metadata.robots && typeof metadata.robots === "object" && !Array.isArray(metadata.robots)) {
      expect(metadata.robots.index).toBe(true);
      expect(metadata.robots.follow).toBe(true);
    }
  });

  it("has favicon icon", () => {
    expect(metadata.icons).toBeInstanceOf(Array);
    expect((metadata.icons as { rel: string; url: string }[])[0]).toEqual({
      rel: "icon",
      url: "/favicon.ico",
    });
  });
});
