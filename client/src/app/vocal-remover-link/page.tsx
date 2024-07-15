"use client";

import axios from "axios";
import { useState } from "react";

export default function VocalRemoverLink() {
  const [link, setLink] = useState("");
  const [outputPath, setOutputPath] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/upload-link",
        { link }
      );
      setOutputPath(response.data.outputPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center justify-center bg-background">
        <div className="w-full py-12 md:py-16">
          <form className="block" onSubmit={handleSubmit}>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste YouTube link here"
            />
            <button type="submit">Process</button>
            {outputPath && <p>Output Path: {outputPath}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
