import React, { useState } from "react";
import axios from "axios";
import "./VideoDownloader.css";

const VideoDownloader = () => {
  const [url, setUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("http://downloader-backend-production.up.railway.app/api/video", {
        url,
      });
      setVideoData(response.data);
    } catch (err) {
      setError("Failed to fetch video. Please enter a valid YouTube URL.");
      setVideoData(null);
    }
  };

  const handleDownload = (format) => {
    const downloadUrl = `http://downloader-backend-production.up.railway.app/api/video", {
        url,/api/download?url=${encodeURIComponent(
      url
    )}&itag=${format.itag}`;
    window.location.href = downloadUrl;
  };

  return (
    <div className="video-downloader">
      <h1>YouTube Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Fetch Video</button>
      </form>

      {error && <p className="error">{error}</p>}

      {videoData && (
        <div className="video-details">
          <div className="thumbnail">
            <img src={videoData.thumbnail} alt={videoData.title} />
          </div>
          <div className="formats">
            <h2>{videoData.title}</h2>
            {videoData.formats.map((format) => (
              <div key={format.itag}>
                <button onClick={() => handleDownload(format)}>
                  Download {format.quality}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDownloader;
