import React, { useState } from "react";
import axios from "axios";
import "./VideoDownloader.css";

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState("");

  const fetchVideo = async () => {
    setError("");
    try {
      const response = await axios.post("https://downloader-backend-production.up.railway.app/api/video", {
        url,
      });
      setVideoDetails(response.data);
    } catch (err) {
      setError("Failed to fetch video. Please enter a valid YouTube URL.");
    }
  };

  const downloadVideo = (itag) => {
    const downloadUrl = `https://downloader-backend-production.up.railway.app/api/download?url=${encodeURIComponent(
      url
    )}&itag=${itag}`;

    // Create a hidden anchor element to trigger the download without opening a new tab
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = true;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // Remove the anchor after triggering the download
  };

  return (
    <div>
      <h2>YouTube Video Downloader</h2>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
      <button onClick={fetchVideo}>Fetch Video</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {videoDetails && (
        <div>
          <img src={videoDetails.thumbnail} alt="Video thumbnail" />
          <h3>{videoDetails.title}</h3>
          <ul>
            {videoDetails.formats.map((format, index) => (
              <li key={index}>
                <button onClick={() => downloadVideo(format.itag)}>
                  Download {format.quality} ({format.type})
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;
