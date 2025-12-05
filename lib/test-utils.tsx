/* eslint-disable no-undef */
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/lib/themes";
import type { ReactElement, ReactNode } from "react";

// Mock localStorage for tests
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

if (typeof window !== "undefined") {
  Object.defineProperty(window, "localStorage", { value: localStorageMock });
}

interface WrapperProps {
  children: ReactNode;
}

function AllTheProviders({ children }: WrapperProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function customRender(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
export * from "@testing-library/react";

// Override render method
export { customRender as render };
