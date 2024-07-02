import React, { useState } from "react";
import axios from "axios";

interface FileUploadProps {
  setAudioComponents: (components: any) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ setAudioComponents }) => {
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const onFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("music", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setAudioComponents(response.data);
    } catch (error) {
      console.error("Error uploading file", error);
    }
  };

  return (
    <div className="my-4">
      <input type="file" onChange={onFileChange} className="mb-2" />
      <button
        onClick={onFileUpload}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
