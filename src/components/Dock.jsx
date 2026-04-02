import React from 'react';
import './dock.scss';

const Dock = ({ onIconClick }) => {
  return (
    <footer className="dock">
        <div className="icon" onClick={() => onIconClick('github')} title="GitHub"><img src="/doc-icon/github.png" alt="GitHub" /></div>
        <div className="icon" onClick={() => onIconClick('note')} title="Notes"><img src="/doc-icon/notepad.png" alt="Notepad" /></div>
        <div className="icon" onClick={() => onIconClick('resume')} title="Resume"><img src="/doc-icon/file.png" alt="File" /></div>
        <div className="icon" onClick={() => onIconClick('calendar')} title="Calendar"><img src="/doc-icon/calendar.png" alt="Calendar" /></div>
        <div className="icon" onClick={() => onIconClick('spotify')} title="Spotify"><img src="/doc-icon/spotify.png" alt="Spotify" /></div>
        <div className="icon" onClick={() => onIconClick('mail')} title="Mail"><img src="/doc-icon/mail.png" alt="Mail" /></div>
        <div className="icon" onClick={() => onIconClick('terminal')} title="Terminal"><img src="/doc-icon/terminal.png" alt="Terminal" /></div>
    </footer>

  )
}

export default Dock;