import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../ThemeProvider";
import { defaultTheme } from "../theme-config";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Test component that uses the theme hook
function TestComponent() {
  const { theme, setTheme, mounted } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="mounted">{mounted ? "true" : "false"}</span>
      <button onClick={() => setTheme("japanese")}>Set Japanese</button>
      <button onClick={() => setTheme("organic")}>Set Organic</button>
    </div>
  );
}

describe("ThemeProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.documentElement.className = "";
  });

  it("provides default theme", () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent(defaultTheme);
  });

  it("loads theme from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("japanese");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent("japanese");
  });

  it("ignores invalid theme from localStorage", () => {
    localStorageMock.getItem.mockReturnValue("invalid-theme");

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId("theme")).toHaveTextContent(defaultTheme);
  });

  it("allows changing theme", () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Set Japanese"));

    expect(screen.getByTestId("theme")).toHaveTextContent("japanese");
  });

  it("applies theme class to document", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    // Wait for mount effect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(document.documentElement.classList.contains("theme-memphis")).toBe(true);
  });

  it("saves theme to localStorage on change", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByText("Set Organic"));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(localStorageMock.setItem).toHaveBeenCalledWith("aisavedme-theme", "organic");
  });

  it("sets mounted to true after mount", async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId("mounted")).toHaveTextContent("true");
  });
});

describe("useTheme", () => {
  it("throws error when used outside ThemeProvider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useTheme must be used within a ThemeProvider");

    consoleSpy.mockRestore();
  });
});
