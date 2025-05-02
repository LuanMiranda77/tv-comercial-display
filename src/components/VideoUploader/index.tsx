import React, { useState } from "react";

const VideoUploader: React.FC = () => {
  const [videos, setVideos] = useState<File[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const uploadedFiles = Array.from(event.target.files);

    // Verifica se o limite de 10 vídeos será excedido
    if (videos.length + uploadedFiles.length > 10) {
      alert("Você só pode fazer upload de até 10 vídeos.");
      return;
    }

    // Atualiza o estado com os novos vídeos
    setVideos((prevVideos) => [...prevVideos, ...uploadedFiles]);
  };

  const handleRemove = (index: number) => {
    setVideos((prevVideos) => prevVideos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <h2>Upload de Vídeos</h2>
      <input
        type="file"
        accept="video/*"
        multiple
        onChange={handleUpload}
        disabled={videos.length >= 10}
      />
      <p>{videos.length}/10 vídeos carregados</p>
      <ul>
        {videos.map((video, index) => (
          <li key={index}>
            {video.name}{" "}
            <button onClick={() => handleRemove(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoUploader;