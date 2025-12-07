"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { MAX_FILE_SIZE, type UploadedFile } from "@/lib/schemas/story-submission";

interface FileDropzoneProps {
  files: UploadedFile[];
  // eslint-disable-next-line no-unused-vars
  onFilesChange: (files: UploadedFile[]) => void;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

export function FileDropzone({
  files,
  onFilesChange,
  maxFiles = 5,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    "application/pdf": [".pdf"],
  },
  className,
}: FileDropzoneProps) {
  const { theme } = useTheme();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: UploadedFile[] = acceptedFiles
        .filter((file) => file.size <= MAX_FILE_SIZE)
        .map((file) => ({
          id: generateId(),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        }));

      onFilesChange([...files, ...newFiles].slice(0, maxFiles));
    },
    [files, onFilesChange, maxFiles]
  );

  const removeFile = useCallback(
    (id: string) => {
      const fileToRemove = files.find((f) => f.id === id);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      onFilesChange(files.filter((f) => f.id !== id));
    },
    [files, onFilesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - files.length,
    disabled: files.length >= maxFiles,
  });

  const dropzoneStyles = {
    memphis: cn(
      "border-3 border-dashed p-8 text-center transition-all cursor-pointer",
      isDragActive
        ? "border-electric-blue bg-blue-50"
        : "border-black hover:border-electric-blue hover:bg-blue-50"
    ),
    japanese: cn(
      "border border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
      isDragActive
        ? "border-sumi-black bg-light-100"
        : "border-light-300 hover:border-sumi-black hover:bg-light-100"
    ),
    organic: cn(
      "border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer",
      isDragActive
        ? "border-terracotta bg-cream-dark"
        : "border-sage hover:border-terracotta hover:bg-cream-dark"
    ),
  };

  const fileListStyles = {
    memphis: "mt-4 space-y-2",
    japanese: "mt-4 space-y-2",
    organic: "mt-4 space-y-2",
  };

  const fileItemStyles = {
    memphis: "flex items-center justify-between p-3 bg-white border-2 border-black",
    japanese:
      "flex items-center justify-between p-3 bg-rice-paper border border-light-300 rounded-lg",
    organic: "flex items-center justify-between p-3 bg-cream border border-sage-light rounded-xl",
  };

  const removeButtonStyles = {
    memphis: "p-1 text-coral hover:text-red-700 font-bold transition-colors",
    japanese: "p-1 text-hanko-red hover:text-red-muted transition-colors",
    organic: "p-1 text-terracotta hover:text-terracotta-dark transition-colors",
  };

  return (
    <div className={className}>
      <div {...getRootProps()} className={dropzoneStyles[theme]}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          {isDragActive ? (
            <p className="font-medium">Drop files here...</p>
          ) : (
            <>
              <p className="font-medium">Drag & drop files here, or click to select</p>
              <p className="text-sm text-gray-500">Max {formatFileSize(MAX_FILE_SIZE)} per file</p>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className={fileListStyles[theme]}>
          {files.map((file) => (
            <div key={file.id} className={fileItemStyles[theme]}>
              <div className="flex items-center gap-3">
                {file.preview ? (
                  <img src={file.preview} alt={file.name} className="w-10 h-10 object-cover" />
                ) : (
                  <div className="w-10 h-10 bg-gray-200 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className={removeButtonStyles[theme]}
                title="Remove file"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
