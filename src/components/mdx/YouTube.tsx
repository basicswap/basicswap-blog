import React from 'react';

interface YouTubeProps {
  videoId: string;
  title?: string;
}

const YouTube: React.FC<YouTubeProps> = ({ videoId, title = 'YouTube video' }) => {
  if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) return null;

  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0', overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}
      ></iframe>
    </div>
  );
};

export default YouTube;
