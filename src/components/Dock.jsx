import React from 'react';
import './dock.scss';

const Dock = () => {
  return (
    <footer className="dock">
        <div className="icon"><img src="/doc-icon/github.png" alt="GitHub" /></div>
        <div className="icon"><img src="/doc-icon/notepad.png" alt="Notepad" /></div>
        <div className="icon"><img src="/doc-icon/file.png" alt="File" /></div>
        <div className="icon"><img src="/doc-icon/calendar.png" alt="Calendar" /></div>
        <div className="icon"><img src="/doc-icon/spotify.png" alt="Spotify" /></div>
        <div className="icon"><img src="/doc-icon/mail.png" alt="Mail" /></div>
        <div className="icon"><img src="/doc-icon/terminal.png" alt="Terminal" /></div>


    </footer>
  )
}

export default Dock;