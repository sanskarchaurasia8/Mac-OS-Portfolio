import React from 'react';
import {Rnd} from 'react-rnd';
import './window.scss';

const MacWindow = ({children, title = "zsh", onClose, onMinimize, onFullscreen, isFullscreen, width = "40vw", height = "40vh"})=>{
    return (
        <Rnd
            default={{
                width: width,
                height: height,
                x: 300,
                y: 200
            }}
            disableDragging={isFullscreen}
            enableResizing={!isFullscreen}
            className={isFullscreen ? 'rnd-fullscreen' : ''}
            style={isFullscreen ? { width: '100vw', height: '100vh', transform: 'translate(0,0)' } : {}}
        >
            <div className={`window ${isFullscreen ? 'fullscreen' : ''}`}>
                <div className="nav" onDoubleClick={onFullscreen}>
                    <div className="dots">
                        <div className="dot red" onClick={onClose} style={{cursor: 'pointer'}}></div>
                        <div className="dot yellow" onClick={onMinimize} style={{cursor: 'pointer'}}></div>
                        <div className="dot green" onClick={onFullscreen} style={{cursor: 'pointer'}}></div>
                    </div>
                    <div className="title"><p>sanskarchaurasia — {title}</p></div>
                </div>
                <div className="main-content">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow;