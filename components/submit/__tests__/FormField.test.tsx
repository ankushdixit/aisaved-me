import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormField, TextInput, TextArea, SelectInput, Checkbox } from "../FormField";

// Mock useTheme hook
jest.mock("@/lib/themes", () => ({
  useTheme: jest.fn(() => ({ theme: "memphis", mounted: true })),
}));

import { useTheme } from "@/lib/themes";
const mockUseTheme = useTheme as jest.Mock;

describe("FormField", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
  });

  describe("Basic rendering", () => {
    it("renders label correctly", () => {
      render(
        <FormField label="Test Label">
          <input />
        </FormField>
      );

      expect(screen.getByText("Test Label")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(
        <FormField label="Label">
          <input placeholder="test input" />
        </FormField>
      );

      expect(screen.getByPlaceholderText("test input")).toBeInTheDocument();
    });

    it("shows required indicator (*) when required is true", () => {
      render(
        <FormField label="Required Field" required={true}>
          <input />
        </FormField>
      );

      expect(screen.getByText("*")).toBeInTheDocument();
    });

    it("does not show required indicator when required is false", () => {
      render(
        <FormField label="Optional Field" required={false}>
          <input />
        </FormField>
      );

      expect(screen.queryByText("*")).not.toBeInTheDocument();
    });

    it("renders hint text when provided", () => {
      render(
        <FormField label="Label" hint="This is a helpful hint">
          <input />
        </FormField>
      );

      expect(screen.getByText("This is a helpful hint")).toBeInTheDocument();
    });

    it("does not render hint when not provided", () => {
      const { container } = render(
        <FormField label="Label">
          <input />
        </FormField>
      );

      // Check that hint paragraph doesn't exist
      const hints = container.querySelectorAll("p");
      expect(hints.length).toBe(0);
    });

    it("renders error message when provided", () => {
      render(
        <FormField label="Label" error="This field is required">
          <input />
        </FormField>
      );

      expect(screen.getByText("This field is required")).toBeInTheDocument();
    });

    it("does not render error when not provided", () => {
      render(
        <FormField label="Label">
          <input />
        </FormField>
      );

      expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
    });

    it("applies custom className when provided", () => {
      const { container } = render(
        <FormField label="Label" className="custom-class">
          <input />
        </FormField>
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders label with Memphis styling", () => {
      render(
        <FormField label="Memphis Label">
          <input />
        </FormField>
      );

      const label = screen.getByText("Memphis Label");
      expect(label).toHaveClass("font-display");
      expect(label).toHaveClass("font-bold");
      expect(label).toHaveClass("uppercase");
    });

    it("renders hint with Memphis styling", () => {
      render(
        <FormField label="Label" hint="Memphis hint">
          <input />
        </FormField>
      );

      const hint = screen.getByText("Memphis hint");
      expect(hint).toHaveClass("text-gray-600");
    });

    it("renders error with Memphis styling", () => {
      render(
        <FormField label="Label" error="Memphis error">
          <input />
        </FormField>
      );

      const error = screen.getByText("Memphis error");
      expect(error).toHaveClass("text-coral");
      expect(error).toHaveClass("font-bold");
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders label with Japanese styling", () => {
      render(
        <FormField label="Japanese Label">
          <input />
        </FormField>
      );

      const label = screen.getByText("Japanese Label");
      expect(label).toHaveClass("font-medium");
      expect(label).toHaveClass("text-sumi-black");
    });

    it("renders hint with Japanese styling", () => {
      render(
        <FormField label="Label" hint="Japanese hint">
          <input />
        </FormField>
      );

      const hint = screen.getByText("Japanese hint");
      expect(hint).toHaveClass("text-warm-gray");
    });

    it("renders error with Japanese styling", () => {
      render(
        <FormField label="Label" error="Japanese error">
          <input />
        </FormField>
      );

      const error = screen.getByText("Japanese error");
      expect(error).toHaveClass("text-hanko-red");
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders label with Organic styling", () => {
      render(
        <FormField label="Organic Label">
          <input />
        </FormField>
      );

      const label = screen.getByText("Organic Label");
      expect(label).toHaveClass("font-semibold");
      expect(label).toHaveClass("text-clay");
    });

    it("renders hint with Organic styling", () => {
      render(
        <FormField label="Label" hint="Organic hint">
          <input />
        </FormField>
      );

      const hint = screen.getByText("Organic hint");
      expect(hint).toHaveClass("text-clay-light");
    });

    it("renders error with Organic styling", () => {
      render(
        <FormField label="Label" error="Organic error">
          <input />
        </FormField>
      );

      const error = screen.getByText("Organic error");
      expect(error).toHaveClass("text-terracotta");
    });
  });
});

describe("TextInput", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
  });

  describe("Basic functionality", () => {
    it("renders with correct value", () => {
      render(<TextInput value="test value" onChange={jest.fn()} />);

      const input = screen.getByDisplayValue("test value");
      expect(input).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<TextInput value="" onChange={jest.fn()} placeholder="Enter text here" />);

      expect(screen.getByPlaceholderText("Enter text here")).toBeInTheDocument();
    });

    it("calls onChange when value changes", async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<TextInput value="" onChange={onChange} />);

      const input = screen.getByRole("textbox");
      await user.type(input, "new value");

      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith("n");
    });

    it("respects maxLength prop", () => {
      render(<TextInput value="" onChange={jest.fn()} maxLength={10} />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.maxLength).toBe(10);
    });

    it("renders as text type by default", () => {
      render(<TextInput value="" onChange={jest.fn()} />);

      const input = screen.getByRole("textbox") as HTMLInputElement;
      expect(input.type).toBe("text");
    });

    it("renders as number type when specified", () => {
      render(<TextInput value="" onChange={jest.fn()} type="number" />);

      const input = screen.getByRole("spinbutton") as HTMLInputElement;
      expect(input.type).toBe("number");
    });

    it("renders as url type when specified", () => {
      render(<TextInput value="" onChange={jest.fn()} type="url" />);

      const input = document.querySelector("input[type='url']");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Character counter", () => {
    it("shows counter when showCounter is true and maxLength is set", () => {
      render(<TextInput value="test" onChange={jest.fn()} maxLength={100} showCounter={true} />);

      expect(screen.getByText("4/100")).toBeInTheDocument();
    });

    it("does not show counter when showCounter is false", () => {
      render(<TextInput value="test" onChange={jest.fn()} maxLength={100} showCounter={false} />);

      expect(screen.queryByText("4/100")).not.toBeInTheDocument();
    });

    it("does not show counter when maxLength is not set", () => {
      render(<TextInput value="test" onChange={jest.fn()} showCounter={true} />);

      expect(screen.queryByText(/\d+\/\d+/)).not.toBeInTheDocument();
    });

    it("shows warning color when approaching maxLength", () => {
      render(
        <TextInput value="1234567890" onChange={jest.fn()} maxLength={10} showCounter={true} />
      );

      const counter = screen.getByText("10/10");
      expect(counter).toHaveClass("text-coral");
    });

    it("shows normal color when below 90% of maxLength", () => {
      render(<TextInput value="12345" onChange={jest.fn()} maxLength={100} showCounter={true} />);

      const counter = screen.getByText("5/100");
      expect(counter).toHaveClass("text-gray-500");
    });
  });

  describe("Error state", () => {
    it("shows error border when error is true", () => {
      render(<TextInput value="" onChange={jest.fn()} error={true} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-coral");
    });

    it("shows normal border when error is false", () => {
      render(<TextInput value="" onChange={jest.fn()} error={false} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-black");
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders with Memphis styling", () => {
      render(<TextInput value="" onChange={jest.fn()} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-2");
      // Memphis theme uses sharp corners (no rounded-lg)
      expect(input).not.toHaveClass("rounded-lg");
      expect(input).toHaveClass("focus:ring-electric-blue");
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders with Japanese styling", () => {
      render(<TextInput value="" onChange={jest.fn()} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("bg-rice-paper");
      expect(input).toHaveClass("focus:ring-sumi-black");
    });

    it("shows Japanese error border", () => {
      render(<TextInput value="" onChange={jest.fn()} error={true} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-hanko-red");
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders with Organic styling", () => {
      render(<TextInput value="" onChange={jest.fn()} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("bg-cream");
      expect(input).toHaveClass("rounded-xl");
      expect(input).toHaveClass("focus:ring-terracotta");
    });

    it("shows Organic error border", () => {
      render(<TextInput value="" onChange={jest.fn()} error={true} />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveClass("border-terracotta");
    });
  });
});

describe("TextArea", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
  });

  describe("Basic functionality", () => {
    it("renders with correct value", () => {
      render(<TextArea value="test value" onChange={jest.fn()} />);

      const textarea = screen.getByDisplayValue("test value");
      expect(textarea).toBeInTheDocument();
    });

    it("renders with placeholder", () => {
      render(<TextArea value="" onChange={jest.fn()} placeholder="Enter description" />);

      expect(screen.getByPlaceholderText("Enter description")).toBeInTheDocument();
    });

    it("calls onChange when value changes", async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<TextArea value="" onChange={onChange} />);

      const textarea = screen.getByRole("textbox");
      await user.type(textarea, "new text");

      expect(onChange).toHaveBeenCalled();
    });

    it("uses default rows of 4", () => {
      render(<TextArea value="" onChange={jest.fn()} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.rows).toBe(4);
    });

    it("respects custom rows prop", () => {
      render(<TextArea value="" onChange={jest.fn()} rows={10} />);

      const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
      expect(textarea.rows).toBe(10);
    });
  });

  describe("Error state", () => {
    it("shows error border when error is true", () => {
      render(<TextArea value="" onChange={jest.fn()} error={true} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-coral");
    });

    it("shows normal border when error is false", () => {
      render(<TextArea value="" onChange={jest.fn()} error={false} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-black");
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders with Memphis styling", () => {
      render(<TextArea value="" onChange={jest.fn()} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-2");
      // Memphis theme uses sharp corners (no rounded-lg)
      expect(textarea).not.toHaveClass("rounded-lg");
      expect(textarea).toHaveClass("focus:ring-electric-blue");
      expect(textarea).toHaveClass("resize-none");
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders with Japanese styling", () => {
      render(<TextArea value="" onChange={jest.fn()} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("bg-rice-paper");
      expect(textarea).toHaveClass("focus:ring-sumi-black");
    });

    it("shows Japanese error border", () => {
      render(<TextArea value="" onChange={jest.fn()} error={true} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("border-hanko-red");
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders with Organic styling", () => {
      render(<TextArea value="" onChange={jest.fn()} />);

      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveClass("bg-cream");
      expect(textarea).toHaveClass("rounded-xl");
      expect(textarea).toHaveClass("focus:ring-terracotta");
    });
  });
});

describe("SelectInput", () => {
  const options = ["Option 1", "Option 2", "Option 3"] as const;

  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
  });

  describe("Basic functionality", () => {
    it("renders all options", () => {
      render(<SelectInput value="" onChange={jest.fn()} options={options} />);

      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(select.options.length).toBe(3);
    });

    it("renders with correct selected value", () => {
      render(<SelectInput value="Option 2" onChange={jest.fn()} options={options} />);

      const select = screen.getByRole("combobox") as HTMLSelectElement;
      expect(select.value).toBe("Option 2");
    });

    it("renders placeholder option when provided", () => {
      render(
        <SelectInput
          value=""
          onChange={jest.fn()}
          options={options}
          placeholder="Select an option"
        />
      );

      expect(screen.getByText("Select an option")).toBeInTheDocument();
    });

    it("calls onChange when selection changes", async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<SelectInput value="" onChange={onChange} options={options} />);

      const select = screen.getByRole("combobox");
      await user.selectOptions(select, "Option 2");

      expect(onChange).toHaveBeenCalledWith("Option 2");
    });

    it("renders dropdown icon", () => {
      const { container } = render(<SelectInput value="" onChange={jest.fn()} options={options} />);

      const icon = container.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("shows error border when error is true", () => {
      render(<SelectInput value="" onChange={jest.fn()} options={options} error={true} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-coral");
    });

    it("shows normal border when error is false", () => {
      render(<SelectInput value="" onChange={jest.fn()} options={options} error={false} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-black");
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders with Memphis styling", () => {
      render(<SelectInput value="" onChange={jest.fn()} options={options} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-2");
      // Memphis theme uses sharp corners (no rounded-lg)
      expect(select).not.toHaveClass("rounded-lg");
      expect(select).toHaveClass("focus:ring-electric-blue");
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders with Japanese styling", () => {
      render(<SelectInput value="" onChange={jest.fn()} options={options} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("bg-rice-paper");
      expect(select).toHaveClass("focus:ring-sumi-black");
    });

    it("shows Japanese error border", () => {
      render(<SelectInput value="" onChange={jest.fn()} options={options} error={true} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("border-hanko-red");
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders with Organic styling", () => {
      render(<SelectInput value="" onChange={jest.fn()} options={options} />);

      const select = screen.getByRole("combobox");
      expect(select).toHaveClass("bg-cream");
      expect(select).toHaveClass("rounded-xl");
      expect(select).toHaveClass("focus:ring-terracotta");
    });
  });
});

describe("Checkbox", () => {
  beforeEach(() => {
    mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
  });

  describe("Basic functionality", () => {
    it("renders with label", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Accept terms" />);

      expect(screen.getByText("Accept terms")).toBeInTheDocument();
    });

    it("renders as checked when checked is true", () => {
      render(<Checkbox checked={true} onChange={jest.fn()} label="Checked" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).toBeChecked();
    });

    it("renders as unchecked when checked is false", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Unchecked" />);

      const checkbox = screen.getByRole("checkbox");
      expect(checkbox).not.toBeChecked();
    });

    it("calls onChange with true when clicked while unchecked", async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Checkbox checked={false} onChange={onChange} label="Click me" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(onChange).toHaveBeenCalledWith(true);
    });

    it("calls onChange with false when clicked while checked", async () => {
      const onChange = jest.fn();
      const user = userEvent.setup();

      render(<Checkbox checked={true} onChange={onChange} label="Click me" />);

      const checkbox = screen.getByRole("checkbox");
      await user.click(checkbox);

      expect(onChange).toHaveBeenCalledWith(false);
    });

    it("supports ReactNode as label", () => {
      render(
        <Checkbox
          checked={false}
          onChange={jest.fn()}
          label={
            <span>
              I agree to the <a href="/terms">terms</a>
            </span>
          }
        />
      );

      expect(screen.getByText("I agree to the")).toBeInTheDocument();
      expect(screen.getByText("terms")).toBeInTheDocument();
    });
  });

  describe("Error state", () => {
    it("shows error border when error is true", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Test" error={true} />);

      // Get the visual container (parent of hidden input)
      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("border-coral");
    });
  });

  describe("Memphis theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "memphis", mounted: true });
    });

    it("renders with Memphis styling when unchecked", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Memphis" />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("border-black");
      expect(container).toHaveClass("bg-white");
    });

    it("renders with Memphis styling when checked", () => {
      render(<Checkbox checked={true} onChange={jest.fn()} label="Memphis" />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("bg-electric-blue");
    });
  });

  describe("Japanese theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "japanese", mounted: true });
    });

    it("renders with Japanese styling when unchecked", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Japanese" />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("bg-rice-paper");
      expect(container).toHaveClass("border-light-300");
    });

    it("renders with Japanese styling when checked", () => {
      render(<Checkbox checked={true} onChange={jest.fn()} label="Japanese" />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("bg-sumi-black");
      expect(container).toHaveClass("border-sumi-black");
    });

    it("shows Japanese error border", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Test" error={true} />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("border-hanko-red");
    });
  });

  describe("Organic theme", () => {
    beforeEach(() => {
      mockUseTheme.mockReturnValue({ theme: "organic", mounted: true });
    });

    it("renders with Organic styling when unchecked", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Organic" />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("bg-cream");
      expect(container).toHaveClass("border-sage-light");
    });

    it("renders with Organic styling when checked", () => {
      render(<Checkbox checked={true} onChange={jest.fn()} label="Organic" />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("bg-sage");
      expect(container).toHaveClass("border-sage-dark");
    });

    it("shows Organic error border", () => {
      render(<Checkbox checked={false} onChange={jest.fn()} label="Test" error={true} />);

      const checkbox = screen.getByRole("checkbox");
      const container = checkbox.parentElement;
      expect(container).toHaveClass("border-terracotta");
    });
  });
});
