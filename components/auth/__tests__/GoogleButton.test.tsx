import { render, screen, fireEvent } from "@testing-library/react";
import { GoogleButton } from "../memphis/GoogleButton";
import { signIn } from "next-auth/react";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("GoogleButton (Memphis)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders button with Google text", () => {
    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    expect(button).toBeInTheDocument();
  });

  it("renders Google icon/logo", () => {
    render(<GoogleButton />);

    // Check for SVG element
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("calls signIn with google provider on click", () => {
    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/" });
  });

  it("uses custom callbackUrl when provided", () => {
    render(<GoogleButton callbackUrl="/dashboard" />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith("google", { callbackUrl: "/dashboard" });
  });

  it("renders with Memphis theme styles", () => {
    render(<GoogleButton />);

    const button = screen.getByRole("button", { name: /continue with google/i });
    expect(button).toHaveClass("border-3", "border-black", "shadow-memphis-md");
  });
});
