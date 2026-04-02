import { useState } from 'react';
import './app.scss';
import Dock from './components/Dock';
import Nav from './components/Nav';
import MacWindow from './components/windows/MacWindow';
import Github from './components/windows/Github';
import Note from './components/windows/Note';
import Resume from './components/windows/Resume';
import Spotify from './components/windows/Spotify';
import Cli from './components/windows/Cli';
import Calendar from './components/windows/Calendar';
import Mail from './components/windows/Mail';


function App() {
  const [openWindows, setOpenWindows] = useState({
    github: false,
    note: false,
    resume: false,
    spotify: false,
    terminal: false,
    calendar: false,
    mail: false
  });


  const toggleWindow = (window) => {
    setOpenWindows(prev => ({
      ...prev,
      [window]: !prev[window]
    }));
  };

  const closeWindow = (window) => {
    setOpenWindows(prev => ({
      ...prev,
      [window]: false
    }));
  }

  return (
    <main>
      <Nav onIconClick={toggleWindow} />

      {openWindows.github && <Github onClose={() => closeWindow('github')} />}
      {openWindows.note && <Note onClose={() => closeWindow('note')} />}
      {openWindows.resume && <Resume onClose={() => closeWindow('resume')} />}
      {openWindows.spotify && <Spotify onClose={() => closeWindow('spotify')} />}
      {openWindows.terminal && <Cli onClose={() => closeWindow('terminal')} />}
      {openWindows.calendar && <Calendar onClose={() => closeWindow('calendar')} />}
      {openWindows.mail && <Mail onClose={() => closeWindow('mail')} />}
      <Dock onIconClick={toggleWindow} />

    </main>
  )
}

export default App
