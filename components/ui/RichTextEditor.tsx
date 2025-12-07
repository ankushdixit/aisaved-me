"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useCallback } from "react";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

function ToolbarButton({
  active,
  onClick,
  children,
  title,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title: string;
}) {
  const { theme } = useTheme();

  const baseStyles = "px-2 py-1 text-sm font-medium transition-colors";

  const themeStyles = {
    memphis: cn(
      "hover:bg-gray-200 border border-transparent",
      active && "bg-gray-200 border-black"
    ),
    japanese: cn(
      "hover:bg-light-200 border border-transparent",
      active && "bg-light-200 border-sumi-black"
    ),
    organic: cn(
      "hover:bg-cream-dark border border-transparent",
      active && "bg-cream-dark border-clay"
    ),
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseStyles, themeStyles[theme])}
      title={title}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  className,
  error,
}: RichTextEditorProps) {
  const { theme } = useTheme();

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    immediatelyRender: false, // Prevent SSR hydration mismatch
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[100px] px-4 py-3 outline-none max-w-none",
          "focus:outline-none",
          // Custom prose-like styles for rich text
          "[&_p]:mb-3 [&_p]:leading-relaxed",
          "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-3 [&_ul]:space-y-1",
          "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-3 [&_ol]:space-y-1",
          "[&_li]:pl-1",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-gray-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-3",
          "[&_strong]:font-bold",
          "[&_em]:italic"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  const toggleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const toggleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const toggleBulletList = useCallback(() => {
    editor?.chain().focus().toggleBulletList().run();
  }, [editor]);

  const toggleOrderedList = useCallback(() => {
    editor?.chain().focus().toggleOrderedList().run();
  }, [editor]);

  const toggleBlockquote = useCallback(() => {
    editor?.chain().focus().toggleBlockquote().run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const containerStyles = {
    memphis: cn(
      "border-2 overflow-hidden",
      error ? "border-coral" : "border-black",
      "focus-within:ring-2 focus-within:ring-electric-blue"
    ),
    japanese: cn(
      "border rounded-lg overflow-hidden",
      error ? "border-hanko-red" : "border-light-300",
      "focus-within:ring-1 focus-within:ring-sumi-black"
    ),
    organic: cn(
      "border rounded-xl overflow-hidden",
      error ? "border-terracotta" : "border-sage-light",
      "focus-within:ring-2 focus-within:ring-terracotta"
    ),
  };

  const toolbarStyles = {
    memphis: "bg-gray-100 border-b-2 border-black px-2 py-1",
    japanese: "bg-light-100 border-b border-light-300 px-2 py-1",
    organic: "bg-cream-dark border-b border-sage-light px-2 py-1",
  };

  const editorBgStyles = {
    memphis: "bg-white",
    japanese: "bg-rice-paper",
    organic: "bg-cream",
  };

  return (
    <div className={cn(containerStyles[theme], className)}>
      {/* Toolbar */}
      <div className={cn("flex items-center gap-1", toolbarStyles[theme])}>
        <ToolbarButton active={editor.isActive("bold")} onClick={toggleBold} title="Bold">
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton active={editor.isActive("italic")} onClick={toggleItalic} title="Italic">
          <em>I</em>
        </ToolbarButton>
        <div className="w-px h-5 bg-gray-300 mx-1" />
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={toggleBulletList}
          title="Bullet List"
        >
          •
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={toggleOrderedList}
          title="Numbered List"
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={toggleBlockquote}
          title="Quote"
        >
          &ldquo;
        </ToolbarButton>
      </div>

      {/* Editor */}
      <div className={editorBgStyles[theme]}>
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  );
}
