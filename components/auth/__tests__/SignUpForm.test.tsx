import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUpForm } from "../memphis/SignUpForm";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("SignUpForm (Memphis)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form header", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("heading", { name: "Create Account" })).toBeInTheDocument();
    expect(screen.getByText("Join our community of AI success stories")).toBeInTheDocument();
  });

  it("renders Google button", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
  });

  it("renders name input", () => {
    render(<SignUpForm />);

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute("type", "text");
  });

  it("renders email input", () => {
    render(<SignUpForm />);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("renders password input with hint", () => {
    render(<SignUpForm />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(screen.getByText("Must be at least 8 characters")).toBeInTheDocument();
  });

  it("renders confirm password input", () => {
    render(<SignUpForm />);

    const confirmInput = screen.getByLabelText("Confirm Password");
    expect(confirmInput).toBeInTheDocument();
  });

  it("toggles password visibility for both fields", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    const passwordInput = screen.getByLabelText("Password");
    const confirmInput = screen.getByLabelText("Confirm Password");
    const toggleButton = screen.getByRole("button", { name: "Show" });

    expect(passwordInput).toHaveAttribute("type", "password");
    expect(confirmInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(confirmInput).toHaveAttribute("type", "text");
  });

  it("renders sign up button", () => {
    render(<SignUpForm />);

    expect(screen.getByRole("button", { name: "Create Account" })).toBeInTheDocument();
  });

  it("renders sign in link", () => {
    render(<SignUpForm />);

    const signInLink = screen.getByRole("link", { name: "Sign in" });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute("href", "/auth/signin");
  });

  it("shows error when password is too short", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.type(screen.getByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "short");
    await user.type(screen.getByLabelText("Confirm Password"), "short");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    expect(screen.getByText("Password must be at least 8 characters long")).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("shows error when passwords do not match", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);

    await user.type(screen.getByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "different123");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("submits form with valid data", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Account created successfully" }),
    } as Response);

    render(<SignUpForm />);

    await user.type(screen.getByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        }),
      });
    });
  });

  it("shows success message after registration", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Account created successfully" }),
    } as Response);

    render(<SignUpForm />);

    await user.type(screen.getByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(screen.getByText("Account Created!")).toBeInTheDocument();
      expect(screen.getByText(/Check your email to verify your account/)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: "Go to Sign In" })).toHaveAttribute(
        "href",
        "/auth/signin"
      );
    });
  });

  it("shows error message on registration failure", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Email already in use" }),
    } as Response);

    render(<SignUpForm />);

    await user.type(screen.getByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(screen.getByText("Email already in use")).toBeInTheDocument();
    });
  });

  it("shows loading state during submission", async () => {
    const user = userEvent.setup();
    // eslint-disable-next-line no-unused-vars
    let resolveFetch: (_value: unknown) => void;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    mockFetch.mockReturnValueOnce(fetchPromise as Promise<Response>);

    render(<SignUpForm />);

    await user.type(screen.getByLabelText("Name"), "Test User");
    await user.type(screen.getByLabelText("Email"), "test@example.com");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm Password"), "password123");
    await user.click(screen.getByRole("button", { name: "Create Account" }));

    expect(screen.getByRole("button", { name: "Creating account..." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Creating account..." })).toBeDisabled();

    // Resolve the promise
    resolveFetch!({
      ok: true,
      json: async () => ({ message: "Success" }),
    });
  });
});
