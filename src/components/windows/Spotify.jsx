import React from 'react';
import MacWindow from './MacWindow';
import './spotify.scss';


const Spotify = ({ onClose, onMinimize, onFullscreen, isFullscreen })=>{
    return(
            <MacWindow width='20vw' height='20vh' title="Spotify" onClose={onClose} onMinimize={onMinimize} onFullscreen={onFullscreen} isFullscreen={isFullscreen}>
                <div className="spotify-window">
                    <iframe data-testid="embed-iframe" style={{borderRadius:"12px"}} 
                    src="https://open.spotify.com/embed/album/4jlyYLklV3kTBA6trX3bpj?utm_source=generator&theme=0" 
                    width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy"></iframe>
                </div>
            </MacWindow>
    )
}

export default Spotify;