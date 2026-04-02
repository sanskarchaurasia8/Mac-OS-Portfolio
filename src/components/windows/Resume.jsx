import React from 'react';
import MacWindow from './MacWindow';
import './resume.scss';

const Resume = ({ onClose })=>{
    return(
        <MacWindow title="Resume" onClose={onClose}>
            <div className='resume-window'>
            <embed src='/resume.pdf' frameBorder='0'></embed>
        </div>
        </MacWindow>
        
    )
}

export default Resume;