import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { ThemeProvider } from "@/lib/themes";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

function renderWithProvider() {
  return render(
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    document.documentElement.className = "";
  });

  it("renders the theme toggle button", () => {
    renderWithProvider();

    expect(screen.getByRole("button", { name: /open theme selector/i })).toBeInTheDocument();
  });

  it("opens theme panel when button is clicked", () => {
    renderWithProvider();

    fireEvent.click(screen.getByRole("button", { name: /open theme selector/i }));

    expect(screen.getByText("Choose Theme")).toBeInTheDocument();
  });

  it("displays all theme options", () => {
    renderWithProvider();

    fireEvent.click(screen.getByRole("button", { name: /open theme selector/i }));

    expect(screen.getByText("Memphis")).toBeInTheDocument();
    expect(screen.getByText("Zen")).toBeInTheDocument();
    expect(screen.getByText("Organic")).toBeInTheDocument();
  });

  it("displays theme descriptions", () => {
    renderWithProvider();

    fireEvent.click(screen.getByRole("button", { name: /open theme selector/i }));

    expect(screen.getByText("Bold, geometric, and playful")).toBeInTheDocument();
    expect(screen.getByText("Minimal, calm, and refined")).toBeInTheDocument();
    expect(screen.getByText("Warm, natural, and approachable")).toBeInTheDocument();
  });

  it("closes panel when a theme is selected", () => {
    renderWithProvider();

    fireEvent.click(screen.getByRole("button", { name: /open theme selector/i }));
    fireEvent.click(screen.getByText("Zen"));

    expect(screen.queryByText("Choose Theme")).not.toBeInTheDocument();
  });

  it("closes panel on escape key", () => {
    renderWithProvider();

    fireEvent.click(screen.getByRole("button", { name: /open theme selector/i }));

    expect(screen.getByText("Choose Theme")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(screen.queryByText("Choose Theme")).not.toBeInTheDocument();
  });

  it("shows checkmark for current theme", () => {
    renderWithProvider();

    fireEvent.click(screen.getByRole("button", { name: /open theme selector/i }));

    // Memphis is default, should have checkmark
    const memphisButton = screen.getByText("Memphis").closest("button");
    expect(memphisButton).toHaveAttribute("aria-pressed", "true");
  });

  it("updates button aria-label when panel is open", () => {
    renderWithProvider();

    const button = screen.getByRole("button", { name: /open theme selector/i });
    fireEvent.click(button);

    expect(screen.getByRole("button", { name: /close theme selector/i })).toBeInTheDocument();
  });
});
