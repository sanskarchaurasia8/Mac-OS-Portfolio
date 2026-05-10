import React from 'react';
import MacWindow from './MacWindow';
import './resume.scss';

const Resume = ({ onClose, onMinimize, onFullscreen, isFullscreen })=>{
    return(
        <MacWindow title="Resume" onClose={onClose} onMinimize={onMinimize} onFullscreen={onFullscreen} isFullscreen={isFullscreen}>
            <div className='resume-window'>
            <embed src='/resume.pdf' frameBorder='0'></embed>
        </div>
        </MacWindow>
        
    )
}

export default Resume;