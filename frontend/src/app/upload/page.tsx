"use client"

import { useRef, useState } from "react"

export default function UploadPage() {
    return (
        <div className="pt-32">
            <UploadFile />
        </div>
    )
}

const UploadFile = () => {
    const [youtubeLink, setYoutubeLink] = useState('');

    return (
        <div className="space-y-6 p-6 max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl text-gray-200 mb-2">Paste a YouTube Link</h2>
            <p className="text-gray-400 mb-4">Enter the URL of a YouTube video to embed it on this page.</p>
            <div className="flex">
              <input
                type="text"
                placeholder="Link"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                className="flex-grow bg-gray-700 text-white rounded-l-lg px-4 py-2 focus:outline-none"
              />
              <button className="bg-gray-600 text-white rounded-r-lg px-4 py-2 hover:bg-gray-500 transition">
                Process link
              </button>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border-2 border-dashed border-gray-700">
            <h2 className="text-2xl text-gray-200 mb-2">Upload a File</h2>
            <p className="text-gray-400 mb-4">Drag and drop a file or click to select a file from your device.</p>
            <button className="bg-gray-600 text-white rounded-lg px-6 py-2 hover:bg-gray-500 transition">
              Upload File
            </button>
          </div>
        </div>
    )
}
