import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoList = [
    "/videos/comercial-1.mp4",
    "/videos/comercial-2.mp4",
    "/videos/comercial-3.mp4",
    "/videos/comercial-4.mp4",
    "/videos/comercial-5.mp4",
    "/videos/comercial-6.mp4",
    "/videos/comercial-7.mp4",
    // "/videos/comercial-8.mp4",
    // "/videos/comercial-9.mp4",
    // "/videos/comercial-10.mp4",
  ];

  const handleVideoEnd = () => {
    console.log("asqui");

    setCurrentVideoIndex((prevIndex) => (prevIndex + 1 < videoList.length ? prevIndex + 1 : 0));
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideoIndex]);

  return (
    <main>
      <video className="h-screen w-screen" ref={videoRef} autoPlay loop={false} muted controls onEnded={handleVideoEnd}>
        <source src={videoList[currentVideoIndex]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </main>
  );
}

export default App;
