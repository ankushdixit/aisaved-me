import { render, screen } from "@/lib/test-utils";
import { AdminSidebar } from "../memphis/AdminSidebar";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/admin"),
}));

describe("AdminSidebar", () => {
  it("renders without errors", () => {
    expect(() => render(<AdminSidebar />)).not.toThrow();
  });

  it("renders the logo and title", () => {
    render(<AdminSidebar />);
    expect(screen.getByText("AI Saved Me")).toBeInTheDocument();
    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
  });

  it("renders Dashboard navigation link", () => {
    render(<AdminSidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders Stories navigation link with badge", () => {
    render(<AdminSidebar />);
    expect(screen.getByText("Stories")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders Users navigation link", () => {
    render(<AdminSidebar />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("renders admin user info", () => {
    render(<AdminSidebar />);
    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("has correct href for Dashboard link", () => {
    render(<AdminSidebar />);
    const link = screen.getByText("Dashboard").closest("a");
    expect(link).toHaveAttribute("href", "/admin");
  });

  it("has correct href for Stories link", () => {
    render(<AdminSidebar />);
    const link = screen.getByText("Stories").closest("a");
    expect(link).toHaveAttribute("href", "/admin/stories");
  });

  it("has correct href for Users link", () => {
    render(<AdminSidebar />);
    const link = screen.getByText("Users").closest("a");
    expect(link).toHaveAttribute("href", "/admin/users");
  });
});
