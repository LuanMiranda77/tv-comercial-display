import { useEffect, useRef, useState } from "react";
import "./App.css";

const VIDEO_LIST = [
  "/videos/comercial-1.mp4",
  "/videos/comercial-2.mp4",
  "/videos/comercial-3.mp4",
  "/videos/comercial-4.mp4",
  "/videos/comercial-5.mp4",
  "/videos/comercial-6.mp4",
  "/videos/comercial-7.mp4",
  "/videos/comercial-8.mp4",
  // "/videos/comercial-9.mp4",
  // "/videos/comercial-10.mp4",
];

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const goToNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % VIDEO_LIST.length);
  };

  const handleVideoEnd = () => {
    goToNextVideo();
  };

  const handleVideoError = () => {
    // If one file fails, skip to the next instead of retrying the same file.
    goToNextVideo();
  };

  useEffect(() => {
    if (!videoRef.current || document.hidden) return;

    void videoRef.current.play().catch(() => {
      // Ignore autoplay failures when browser blocks playback.
    });
  }, [currentVideoIndex]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (!videoRef.current) return;

      if (document.hidden) {
        videoRef.current.pause();
        return;
      }

      void videoRef.current.play().catch(() => {
        // Ignore autoplay failures when browser blocks playback.
      });
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return (
    <main>
      <video className="w-screen h-screen" ref={videoRef} src={VIDEO_LIST[currentVideoIndex]} autoPlay muted preload="metadata" playsInline onEnded={handleVideoEnd} onError={handleVideoError}>
        Your browser does not support the video tag.
      </video>
    </main>
  );
}

export default App;
