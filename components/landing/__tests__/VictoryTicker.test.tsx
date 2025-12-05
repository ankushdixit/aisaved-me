import { render, screen } from "@/lib/test-utils";
import { VictoryTicker } from "../memphis/VictoryTicker";

describe("VictoryTicker Component", () => {
  it("renders without errors", () => {
    expect(() => render(<VictoryTicker />)).not.toThrow();
  });

  it("renders ticker stories from row 1", () => {
    render(<VictoryTicker />);
    // Check for first story from row 1
    expect(screen.getAllByText("Enterprise damage claim defeated").length).toBeGreaterThan(0);
    expect(screen.getAllByText("$3,200").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Ankush D. - 2 hours ago").length).toBeGreaterThan(0);
  });

  it("renders ticker stories from row 2", () => {
    render(<VictoryTicker />);
    // Check for first story from row 2
    expect(screen.getAllByText("Contractor paid after small claims prep").length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText("$5,500").length).toBeGreaterThan(0);
  });

  it("renders category tags", () => {
    render(<VictoryTicker />);
    const legalTags = screen.getAllByText("Legal");
    const medicalTags = screen.getAllByText("Medical");
    expect(legalTags.length).toBeGreaterThan(0);
    expect(medicalTags.length).toBeGreaterThan(0);
  });

  it("renders medical outcomes correctly", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("Diagnosis confirmed").length).toBeGreaterThan(0);
    expect(screen.getAllByText("ER visit avoided").length).toBeGreaterThan(0);
  });

  it("renders amount labels correctly", () => {
    render(<VictoryTicker />);
    expect(screen.getAllByText("saved").length).toBeGreaterThan(0);
    expect(screen.getAllByText("recovered").length).toBeGreaterThan(0);
    expect(screen.getAllByText("won").length).toBeGreaterThan(0);
  });

  it("has ticker container class for pause on hover", () => {
    const { container } = render(<VictoryTicker />);
    expect(container.querySelector(".ticker-container")).toBeInTheDocument();
  });
});
