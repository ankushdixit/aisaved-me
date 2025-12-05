import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignInForm } from "../memphis/SignInForm";
import { signIn } from "next-auth/react";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

describe("SignInForm (Memphis)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form header", () => {
    render(<SignInForm />);

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
    expect(screen.getByText("Sign in to share or read AI success stories")).toBeInTheDocument();
  });

  it("renders Google button", () => {
    render(<SignInForm />);

    expect(screen.getByRole("button", { name: /continue with google/i })).toBeInTheDocument();
  });

  it("renders email input", () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(emailInput).toHaveAttribute("placeholder", "you@example.com");
  });

  it("renders password input", () => {
    render(<SignInForm />);

    const passwordInput = screen.getByLabelText("Password");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("toggles password visibility", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const passwordInput = screen.getByLabelText("Password");
    const toggleButton = screen.getByRole("button", { name: "Show" });

    expect(passwordInput).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await user.click(screen.getByRole("button", { name: "Hide" }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("renders sign in button", () => {
    render(<SignInForm />);

    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("renders sign up link", () => {
    render(<SignInForm />);

    const signUpLink = screen.getByRole("link", { name: "Sign up" });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute("href", "/auth/signup");
  });

  it("renders forgot password link", () => {
    render(<SignInForm />);

    const forgotLink = screen.getByRole("link", { name: "Forgot password?" });
    expect(forgotLink).toBeInTheDocument();
  });

  it("displays error prop when provided", () => {
    render(<SignInForm error="Test error message" />);

    expect(screen.getByText("Test error message")).toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    render(<SignInForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "invalid-email");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    // Form should not submit with invalid email
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("submits form with valid credentials", async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValueOnce({
      error: undefined,
      url: "/",
      ok: true,
      status: 200,
      code: undefined,
    });

    render(<SignInForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
        callbackUrl: "/",
      });
    });
  });

  it("shows error message on failed sign in", async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValueOnce({
      error: "CredentialsSignin",
      url: null,
      ok: false,
      status: 401,
      code: "credentials",
    });

    render(<SignInForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email or password")).toBeInTheDocument();
    });
  });

  it("shows loading state during submission", async () => {
    const user = userEvent.setup();
    // Create a promise that we can control
    // eslint-disable-next-line no-unused-vars
    let resolveSignIn: (_value: unknown) => void;
    const signInPromise = new Promise((resolve) => {
      resolveSignIn = resolve;
    });
    mockSignIn.mockReturnValueOnce(signInPromise as ReturnType<typeof signIn>);

    render(<SignInForm />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    expect(screen.getByRole("button", { name: "Signing in..." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Signing in..." })).toBeDisabled();

    // Resolve the promise
    resolveSignIn!({ error: null, url: "/" });
  });

  it("uses custom callbackUrl", async () => {
    const user = userEvent.setup();
    mockSignIn.mockResolvedValueOnce({
      error: undefined,
      url: "/dashboard",
      ok: true,
      status: 200,
      code: undefined,
    });

    render(<SignInForm callbackUrl="/dashboard" />);

    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
        redirect: false,
        callbackUrl: "/dashboard",
      });
    });
  });
});
