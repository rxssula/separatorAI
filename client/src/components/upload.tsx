"use client";

import axios from "axios";
import { useRef, useState } from "react";
import { UploadIcon } from "./icons";

interface UploadProps {
  title: string;
  description: string;
  onStemsUpdate: (newStems: string[]) => void;
}

const Upload: React.FC<UploadProps> = ({
  title,
  description,
  onStemsUpdate,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      await onFileUpload(selectedFile);
    }
  };

  const onFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("audio", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "audio/mp3",
          },
        }
      );
      console.log(response.data);
      onStemsUpdate(response.data.files);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  const onClickUploadArea = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="px-10 grid grid-cols-1">
      <div className="flex flex-col items-center h-screen pt-48 container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          {title}
        </h1>
        <p className="text-muted-foreground text-lg mb-8">{description}</p>
        <div
          onClick={onClickUploadArea}
          className="w-full h-56 bg-muted rounded-lg p-6 flex flex-col items-center justify-center border-2 border-dashed border-primary hover:border-primary-foreground cursor-pointer transition-colors"
        >
          <UploadIcon className="w-12 h-12 mb-4 text-primary" />
          <input
            type="file"
            className="sr-only"
            accept="audio/*"
            onChange={onFileChange}
            ref={fileInputRef}
          />
          <p className="text-muted-foreground text-sm">
            Drag and drop your audio file or click to upload
          </p>
        </div>
      </div>
    </div>
  );
};

export default Upload;
