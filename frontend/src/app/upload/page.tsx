"use client"

import Image from "next/image";
import { useRef, useState, useCallback } from "react"
import {useDropzone} from "react-dropzone"
import axios from "axios";

export default function UploadPage() {
    return (
        <div className="pt-32 container mx-auto">
            <FileUpload />
            <YouTubeEmbed />
        </div>
    )
}

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        setError('Please upload only one MP3 file.');
        return;
      }

      if (acceptedFiles.length === 1) {
        setFile(acceptedFiles[0]);
        setError(null);
        uploadFile(acceptedFiles[0]); // Call uploadFile function when a file is accepted
      } else if (acceptedFiles.length > 1) {
        setError('Please upload only one file.');
      }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        'audio/mpeg': ['.mp3']
      },
      maxFiles: 1,
    });

    const uploadFile = async (file: File) => {
      const formData = new FormData();
      formData.append('audio', file);

      try {
        setUploadStatus('Uploading...');
        const response = await axios.post('https://separatorai-production.up.railway.app/api/v1/upload', formData, {
          headers: {
            'Content-Type': "audio/mp3",
          },
        });
        // const response = await axios.post('http://localhost:5000/api/v1/upload', formData, {
        //   headers: {
        //     'Content-Type': "audio/mp3",
        //   },
        // });
        setUploadStatus('File uploaded successfully!');
        // Handle the response as needed
        console.log(response.data);
      } catch (error) {
        setUploadStatus('Upload failed.');
        setError('An error occurred while uploading the file.');
        console.error('Upload error:', error);
      }
    };

  return (
    <div style={{minHeight: "50vh"}} className="mb-8 p-6 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer">
      <div {...getRootProps()} className="text-center mt-16">
        <input {...getInputProps()} />
        <p className="text-4xl font-semibold mb-2">Upload a File</p>
        <p className="text-gray-400 mb-4">Drag and drop a file or click to select a file from your device.</p>
        <div className="flex flex-col justify-center items-center"><Image src="/icons/upload.svg" alt="upload" width={140} height={140} /></div>
        {file && (
          <p className="text-green-500 mt-2">
            Selected file: {file.name}
          </p>
        )}
        {error && (
          <p className="text-red-500 mt-2">
            {error}
          </p>
        )}
        {uploadStatus && (
          <p className={uploadStatus.includes('success') ? 'text-green-500 mt-2' : 'text-blue-500 mt-2'}>
            {uploadStatus}
          </p>
        )}
      </div>
    </div>
  );
};

const YouTubeEmbed: React.FC = () => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process YouTube link here
    console.log('Processing URL:', url);
  };

  return (
    <div className="mb-8 p-6 border border-gray-600 rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Paste a YouTube Link</h2>
      <p className="text-gray-400 mb-4">Enter the URL of a YouTube video to embed it on this page.</p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Process Link
        </button>
      </form>
    </div>
  );
};
