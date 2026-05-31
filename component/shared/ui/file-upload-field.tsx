"use client";

import React, { useCallback, ReactNode, useState } from "react";
import { useDropzone } from "react-dropzone";

export interface FileUploadFieldProps {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
  acceptedFormats: Record<string, string[]>;
  icon: ReactNode;
  dragPrompt: string;
  helpText: string;
  maxFiles?: number;
  maxSizeBytes?: number; // Add file size limit
}

// File type to allowed MIME types mapping (for server-side validation reference)
const ALLOWED_MIME_TYPES = {
  KML: ["application/vnd.google-earth.kml+xml", "application/xml", "text/xml"],
  IMAGE: ["image/jpeg", "image/png", "image/gif", "image/webp"],
};

// Validate file size
const validateFileSize = (
  file: File,
  maxSizeBytes: number,
): { valid: boolean; error?: string } => {
  if (file.size > maxSizeBytes) {
    const maxSizeMB = (maxSizeBytes / (1024 * 1024)).toFixed(1);
    const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `File size (${fileSizeMB}MB) exceeds maximum allowed size (${maxSizeMB}MB)`,
    };
  }
  return { valid: true };
};

// Validate file MIME type
const validateFileMimeType = (
  file: File,
  acceptedFormats: Record<string, string[]>,
): { valid: boolean; error?: string } => {
  const acceptedMimeTypes = Object.keys(acceptedFormats);

  // Check if file MIME type matches any of the accepted MIME types
  const isValidType = acceptedMimeTypes.some((mimeType) => {
    // Handle wildcards like "image/*"
    if (mimeType.endsWith("/*")) {
      const prefix = mimeType.slice(0, -2);
      return file.type.startsWith(prefix);
    }
    // Exact match
    return file.type === mimeType;
  });

  if (!isValidType) {
    return {
      valid: false,
      error: `File type "${file.type}" is not allowed. Accepted MIME types: ${acceptedMimeTypes.join(", ")}`,
    };
  }
  return { valid: true };
};

// Sanitize filename
const sanitizeFilename = (filename: string): string => {
  // Remove path traversal attempts
  let clean = filename.replace(/\.\.\//g, "").replace(/\.\.\\/g, "");
  // Remove special characters but keep extension
  clean = clean.replace(/[^a-zA-Z0-9._-]/g, "_");
  // Limit length
  return clean.substring(0, 255);
};

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  value,
  onChange,
  acceptedFormats,
  icon,
  dragPrompt,
  helpText,
  maxFiles = 1,
  maxSizeBytes = 10 * 1024 * 1024, // Default 10MB
}) => {
  const [error, setError] = useState<string>("");

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError("");

      if (acceptedFiles.length === 0) {
        setError("No valid files selected");
        return;
      }

      const file = acceptedFiles[0];

      // Validate file size
      const sizeValidation = validateFileSize(file, maxSizeBytes);
      if (!sizeValidation.valid) {
        setError(sizeValidation.error!);
        return;
      }

      // Validate MIME type
      const mimeValidation = validateFileMimeType(file, acceptedFormats);
      if (!mimeValidation.valid) {
        setError(mimeValidation.error!);
        return;
      }

      // Create new file with sanitized name
      const sanitizedName = sanitizeFilename(file.name);
      const sanitizedFile = new File([file], sanitizedName, {
        type: file.type,
      });

      onChange(sanitizedFile);
    },
    [onChange, acceptedFormats, maxSizeBytes],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: acceptedFormats,
      maxFiles,
      multiple: false,
    });

  return (
    <div className="space-y-0.5 sm:space-y-0.5">
      <label className="block text-sm sm:text-xs font-medium text-gray-900">
        {label}
      </label>

      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`w-full p-4 sm:p-3 rounded-lg border-0 transition-all duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer ${
          isDragActive || isDragReject ? "bg-purple-50" : "bg-white"
        } ${error ? "border border-red-300 bg-red-50" : ""}`}
      >
        {/* Icon */}
        <div
          className="p-3 rounded-full"
          style={{ backgroundColor: error ? "#FEE6E6" : "#F3E6FE" }}
        >
          {icon}
        </div>

        {/* Text */}
        <p className="text-sm sm:text-xs text-gray-600 font-medium">
          {dragPrompt}
        </p>

        {/* Upload Button */}
        <button
          type="button"
          className="px-4 sm:px-3 py-0.5 sm:py-0 rounded-full text-xs sm:text-[11px] font-normal border border-purple-500 text-purple-500 bg-transparent hover:bg-purple-50 transition-all duration-300"
        >
          Upload files
        </button>

        {/* Hidden File Input */}
        <input {...getInputProps()} />

        {/* Selected File Display */}
        {value && !error && (
          <p className="text-xs text-green-600 font-medium">✓ {value.name}</p>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-xs text-red-600 font-medium">⚠️ {error}</p>}

      {/* Help Text */}
      <p className="text-xs sm:text-[11px] text-gray-500 italic">{helpText}</p>
      <p className="text-xs sm:text-[11px] text-gray-400">
        Max file size: {(maxSizeBytes / (1024 * 1024)).toFixed(1)}MB
      </p>
    </div>
  );
};

export default FileUploadField;
