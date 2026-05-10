import React from 'react';
import MacWindow from './MacWindow';

const DocumentViewer = ({ onClose, onMinimize, onFullscreen, isFullscreen, item }) => {
  return (
    <MacWindow title={item.title} onClose={onClose} onMinimize={onMinimize} onFullscreen={onFullscreen} isFullscreen={isFullscreen}>
      <div style={{ height: '100%', padding: '20px', color: 'white', overflow: 'auto', backgroundColor: '#1e1e1e' }}>
        {item.data && item.data.startsWith('data:image/') ? (
          <img src={item.data} alt={item.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        ) : item.data && item.data.startsWith('data:application/pdf') ? (
          <embed src={item.data} type="application/pdf" width="100%" height="100%" />
        ) : item.data && item.data.startsWith('data:text/') ? (
          <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            {atob(item.data.split(',')[1])}
          </pre>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', opacity: 0.7 }}>
            <img src={item.icon} alt="icon" style={{ width: '64px', marginBottom: '20px' }} />
            <p>Cannot preview this file type.</p>
            <p style={{ fontSize: '12px' }}>{item.type}</p>
          </div>
        )}
      </div>
    </MacWindow>
  );
};

export default DocumentViewer;
