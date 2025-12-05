import { render, screen } from "@/lib/test-utils";
import { ChatMessage } from "../ChatMessage";
import type { ChatMessage as ChatMessageType } from "@/lib/types/story";

const mockUserMessage: ChatMessageType = {
  id: "msg-1",
  role: "user",
  content: "How can I dispute a medical bill?",
};

const mockAiMessage: ChatMessageType = {
  id: "msg-2",
  role: "ai",
  content:
    "Here are the steps to dispute a medical bill effectively:\n1. Review the bill carefully\n2. Contact the provider\n3. Request an itemized statement",
};

describe("ChatMessage Component - Japanese Theme", () => {
  it("renders without errors", () => {
    expect(() => render(<ChatMessage message={mockUserMessage} />)).not.toThrow();
  });

  it("renders user message content correctly", () => {
    render(<ChatMessage message={mockUserMessage} />);
    expect(screen.getByText("How can I dispute a medical bill?")).toBeInTheDocument();
  });

  it("renders AI message content correctly", () => {
    render(<ChatMessage message={mockAiMessage} />);
    expect(
      screen.getByText(/Here are the steps to dispute a medical bill effectively/)
    ).toBeInTheDocument();
  });

  it("preserves multiline content with whitespace-pre-line", () => {
    render(<ChatMessage message={mockAiMessage} />);
    const messageContent = screen.getByText(
      /Here are the steps to dispute a medical bill effectively/
    );
    expect(messageContent).toHaveClass("whitespace-pre-line");
  });

  it("applies correct alignment for user messages", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const wrapper = container.querySelector(".flex");
    expect(wrapper).toHaveClass("justify-end");
  });

  it("applies correct alignment for AI messages", () => {
    const { container } = render(<ChatMessage message={mockAiMessage} />);
    const wrapper = container.querySelector(".flex");
    expect(wrapper).toHaveClass("justify-start");
  });

  it("applies correct Japanese theme styling for user messages", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const messageBox = container.querySelector(".bg-\\[\\#f5f2ed\\]");
    expect(messageBox).toBeInTheDocument();
    expect(messageBox).toHaveClass("border-[#d4d0c8]");
  });

  it("applies correct Japanese theme styling for AI messages", () => {
    const { container } = render(<ChatMessage message={mockAiMessage} />);
    const messageBox = container.querySelector(".bg-\\[\\#faf8f5\\]");
    expect(messageBox).toBeInTheDocument();
    expect(messageBox).toHaveClass("border-l-2");
    expect(messageBox).toHaveClass("border-[#1a1a1a]");
  });

  it("has max-width constraint for user messages", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const messageBox = container.querySelector(".max-w-\\[85\\%\\]");
    expect(messageBox).toBeInTheDocument();
  });

  it("has max-width constraint for AI messages", () => {
    const { container } = render(<ChatMessage message={mockAiMessage} />);
    const messageBox = container.querySelector(".max-w-\\[85\\%\\]");
    expect(messageBox).toBeInTheDocument();
  });

  it("has consistent text styling across all messages", () => {
    const { container: userContainer } = render(<ChatMessage message={mockUserMessage} />);
    const { container: aiContainer } = render(<ChatMessage message={mockAiMessage} />);

    const userText = userContainer.querySelector("p");
    const aiText = aiContainer.querySelector("p");

    expect(userText).toHaveClass("text-sm");
    expect(userText).toHaveClass("text-[#1a1a1a]");
    expect(aiText).toHaveClass("text-sm");
    expect(aiText).toHaveClass("text-[#1a1a1a]");
  });

  it("applies padding to message boxes", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const messageBox = container.querySelector(".p-4");
    expect(messageBox).toBeInTheDocument();
  });

  it("renders message with special characters correctly", () => {
    const specialMessage: ChatMessageType = {
      id: "msg-3",
      role: "user",
      content: "Can you help with $5,000 bill? It has a 20% markup!",
    };
    render(<ChatMessage message={specialMessage} />);
    expect(
      screen.getByText("Can you help with $5,000 bill? It has a 20% markup!")
    ).toBeInTheDocument();
  });

  it("renders empty message content", () => {
    const emptyMessage: ChatMessageType = {
      id: "msg-4",
      role: "user",
      content: "",
    };
    const { container } = render(<ChatMessage message={emptyMessage} />);
    const messageBox = container.querySelector(".max-w-\\[85\\%\\]");
    expect(messageBox).toBeInTheDocument();
  });

  it("renders very long message content", () => {
    const longMessage: ChatMessageType = {
      id: "msg-5",
      role: "ai",
      content: "A".repeat(1000),
    };
    render(<ChatMessage message={longMessage} />);
    expect(screen.getByText("A".repeat(1000))).toBeInTheDocument();
  });

  it("user messages have border styling", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const messageBox = container.querySelector(".border");
    expect(messageBox).toBeInTheDocument();
  });

  it("AI messages have left border accent", () => {
    const { container } = render(<ChatMessage message={mockAiMessage} />);
    const messageBox = container.querySelector(".border-l-2");
    expect(messageBox).toBeInTheDocument();
  });

  it("handles message role correctly for user", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const wrapper = container.querySelector(".justify-end");
    expect(wrapper).toBeInTheDocument();
  });

  it("handles message role correctly for ai", () => {
    const { container } = render(<ChatMessage message={mockAiMessage} />);
    const wrapper = container.querySelector(".justify-start");
    expect(wrapper).toBeInTheDocument();
  });

  it("renders with newline characters in content", () => {
    const multilineMessage: ChatMessageType = {
      id: "msg-6",
      role: "ai",
      content: "Line 1\nLine 2\nLine 3",
    };
    render(<ChatMessage message={multilineMessage} />);
    expect(screen.getByText(/Line 1/)).toBeInTheDocument();
  });

  it("differentiates user and AI messages by background color", () => {
    const { container: userContainer } = render(<ChatMessage message={mockUserMessage} />);
    const { container: aiContainer } = render(<ChatMessage message={mockAiMessage} />);

    const userBox = userContainer.querySelector(".bg-\\[\\#f5f2ed\\]");
    const aiBox = aiContainer.querySelector(".bg-\\[\\#faf8f5\\]");

    expect(userBox).toBeInTheDocument();
    expect(aiBox).toBeInTheDocument();
  });
});
