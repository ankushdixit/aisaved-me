import { render, screen } from "@/lib/test-utils";
import { ChatMessage } from "../memphis/ChatMessage";
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

describe("ChatMessage Component", () => {
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

  it("applies correct styling for user messages", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const wrapper = container.querySelector(".flex");
    expect(wrapper).toHaveClass("justify-end");

    const messageBox = container.querySelector(".bg-gray-100");
    expect(messageBox).toBeInTheDocument();
    expect(messageBox).toHaveClass("rounded-tl-xl");
    expect(messageBox).toHaveClass("rounded-bl-xl");
    expect(messageBox).toHaveClass("rounded-br-xl");
  });

  it("applies correct styling for AI messages", () => {
    const { container } = render(<ChatMessage message={mockAiMessage} />);
    const wrapper = container.querySelector(".flex");
    expect(wrapper).toHaveClass("justify-start");

    const messageBox = container.querySelector('[class*="bg-[#dbeafe]"]');
    expect(messageBox).toBeInTheDocument();
    expect(messageBox).toHaveClass("rounded-tr-xl");
    expect(messageBox).toHaveClass("rounded-bl-xl");
    expect(messageBox).toHaveClass("rounded-br-xl");
  });

  it("has consistent styling across all messages", () => {
    const { container: userContainer } = render(<ChatMessage message={mockUserMessage} />);
    const { container: aiContainer } = render(<ChatMessage message={mockAiMessage} />);

    // Both should have max-width constraint
    const userMessageBox = userContainer.querySelector(".max-w-\\[85\\%\\]");
    const aiMessageBox = aiContainer.querySelector(".max-w-\\[85\\%\\]");

    expect(userMessageBox).toBeInTheDocument();
    expect(aiMessageBox).toBeInTheDocument();

    // Both should have black border
    expect(userMessageBox).toHaveClass("border-black");
    expect(aiMessageBox).toHaveClass("border-black");

    // Both should have border-3
    expect(userMessageBox).toHaveClass("border-3");
    expect(aiMessageBox).toHaveClass("border-3");
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

  it("applies correct text styling for all messages", () => {
    const { container } = render(<ChatMessage message={mockUserMessage} />);
    const text = container.querySelector(".text-sm");

    expect(text).toHaveClass("font-body");
    expect(text).toHaveClass("text-black");
  });
});
