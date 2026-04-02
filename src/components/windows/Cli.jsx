import React from 'react';
import MacWindow from './MacWindow';
import Terminal from 'react-console-emulator';


const Cli = ({ onClose })=>{
    return(
        <MacWindow title="Terminal" onClose={onClose}>
            <div className="cli-window" style={{ height: '100%', padding: '20px' }}>
                <h1>Terminal Placeholder</h1>
                <p>If you see this, the MacWindow wrapper and App render logic are working correctly.</p>
            </div>
        </MacWindow>
    )
}

export default Cli;