
import React, { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  acceptedFileTypes?: string[];
  onFilesAdded: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  acceptedFileTypes = [".xlsx", ".csv"],
  onFilesAdded,
  maxFiles = 1,
  className,
}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter((file) => {
          const fileExtension = "." + file.name.split(".").pop();
          return acceptedFileTypes.includes(fileExtension.toLowerCase());
        });
        
        if (validFiles.length > 0) {
          onFilesAdded(validFiles.slice(0, maxFiles));
        }
      }
    },
    [acceptedFileTypes, maxFiles, onFilesAdded]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        onFilesAdded(files.slice(0, maxFiles));
      }
    },
    [maxFiles, onFilesAdded]
  );

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-md p-6 text-center transition-colors",
        isDragging
          ? "border-primary bg-primary/10"
          : "border-muted-foreground/30 hover:border-primary/50",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="file-upload"
        type="file"
        className="sr-only"
        onChange={handleFileInput}
        accept={acceptedFileTypes.join(",")}
        multiple={maxFiles > 1}
      />
      <label
        htmlFor="file-upload"
        className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="rounded-full p-2 bg-primary/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div className="text-sm font-medium">
            {isDragging ? "파일을 여기에 놓으세요" : "파일 선택 또는 드래그 앤 드롭"}
          </div>
          <p className="text-xs text-muted-foreground">
            {acceptedFileTypes.join(", ")} 파일만 허용됩니다
            {maxFiles > 1 ? ` (최대 ${maxFiles}개)` : ""}
          </p>
        </div>
      </label>
    </div>
  );
};

export default FileDropzone;
