import React from 'react';
import {Rnd} from 'react-rnd';
import './window.scss';

const MacWindow = ({children, title = "zsh", onClose, width = "40vw", height = "40vh"})=>{
    return (
        <Rnd
        default ={{
            width: width,
            height: height,
            x: 300,
            y: 200
        }}
        >
            <div className="window">
                <div className="nav">
                    <div className="dots">
                        <div className="dot red" onClick={onClose} style={{cursor: 'pointer'}}></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
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