"use client";
import { useState } from "react";

export default function UploadForm() {
  const [shareUrl, setShareUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const file = e.target.file.files[0];
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setShareUrl(data.shareURL); // <-- correct link with filename
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" accept=".stl,.3mf,.obj,.stp" required />
        <button type="submit">Upload</button>
      </form>

      {shareUrl && (
        <p>
          Share this link:{" "}
          <a href={shareUrl} target="_blank" rel="noopener noreferrer">
            {shareUrl}
          </a>
        </p>
      )}
    </div>
  );
}
