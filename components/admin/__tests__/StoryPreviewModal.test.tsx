import { render, screen, fireEvent } from "@/lib/test-utils";
import { StoryPreviewModal } from "../memphis/StoryPreviewModal";
import { type PendingStory } from "@/lib/mock-data/pending-stories";

describe("StoryPreviewModal", () => {
  const mockStory: PendingStory = {
    id: "story-001",
    title: "Test Story Title",
    author: "Test Author",
    category: "legal",
    status: "pending",
    submittedAt: "2025-12-06T10:00:00Z",
    submittedRelative: "2 hours ago",
    content: "This is the first paragraph.\n\nThis is the second paragraph.",
    chatLink: "https://claude.ai/share/test",
    verified: true,
  };

  const mockOnClose = jest.fn();
  const mockOnApprove = jest.fn();
  const mockOnReject = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders nothing when isOpen is false", () => {
    const { container } = render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={false}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when story is null", () => {
    const { container } = render(
      <StoryPreviewModal
        story={null}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders modal when isOpen is true and story is provided", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Story Preview")).toBeInTheDocument();
  });

  it("displays the story title", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Test Story Title")).toBeInTheDocument();
  });

  it("displays the author name", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  it("displays the category badge", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Legal")).toBeInTheDocument();
  });

  it("displays verified badge when story is verified", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText(/Verified/)).toBeInTheDocument();
  });

  it("displays the story content", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("This is the first paragraph.")).toBeInTheDocument();
    expect(screen.getByText("This is the second paragraph.")).toBeInTheDocument();
  });

  it("displays the chat link when provided", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    expect(screen.getByText("Chat Link")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /claude.ai/ });
    expect(link).toHaveAttribute("href", "https://claude.ai/share/test");
  });

  it("calls onClose when close button is clicked", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const closeButtons = screen.getAllByText("✕");
    fireEvent.click(closeButtons[0]);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onClose when Cancel button is clicked", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls onApprove when Approve button is clicked", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const approveButton = screen.getByText("Approve");
    fireEvent.click(approveButton);
    expect(mockOnApprove).toHaveBeenCalledWith(mockStory);
  });

  it("calls onReject when Reject button is clicked", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const rejectButton = screen.getByText("Reject");
    fireEvent.click(rejectButton);
    expect(mockOnReject).toHaveBeenCalledWith(mockStory);
  });

  it("does not call onClose when modal content is clicked", () => {
    render(
      <StoryPreviewModal
        story={mockStory}
        isOpen={true}
        onClose={mockOnClose}
        onApprove={mockOnApprove}
        onReject={mockOnReject}
      />
    );
    const modalContent = screen.getByText("Story Preview").closest("div");
    if (modalContent) {
      fireEvent.click(modalContent);
      // onClose should not be called when clicking inside the modal
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });
});
