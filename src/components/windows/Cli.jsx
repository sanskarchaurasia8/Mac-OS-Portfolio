import React, { useState, useRef, useEffect } from 'react';
import MacWindow from './MacWindow';
import './cli.scss';

const Cli = ({ onClose, onMinimize, onFullscreen, isFullscreen, openWindow }) => {
    const [history, setHistory] = useState([
        { command: '', output: 'Welcome to MacOS Web Terminal. Type "help" for a list of commands.' }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim();
            let output = '';

            const args = cmd.split(' ');
            const mainCmd = args[0].toLowerCase();

            switch (mainCmd) {
                case 'help':
                    output = 'Available commands:\nhelp - show this message\nclear - clear terminal\ndate - show current date/time\necho <text> - print text\nopen github - open github window\nopen notes - open notes window';
                    break;
                case 'clear':
                    setHistory([]);
                    setInput('');
                    return;
                case 'date':
                    output = new Date().toString();
                    break;
                case 'echo':
                    output = args.slice(1).join(' ');
                    break;
                case 'open':
                    const app = args[1]?.toLowerCase();
                    if (app === 'github') {
                        openWindow('github');
                        output = 'Opening Github...';
                    } else if (app === 'notes' || app === 'note') {
                        openWindow('note');
                        output = 'Opening Notes...';
                    } else {
                        output = `Unknown application: ${app}. Try "open github" or "open notes".`;
                    }
                    break;
                case '':
                    output = '';
                    break;
                default:
                    output = `Command not found: ${mainCmd}`;
            }

            setHistory(prev => [...prev, { command: cmd, output }]);
            setInput('');
        }
    };

    return (
        <MacWindow 
            title="Terminal" 
            onClose={onClose} 
            onMinimize={onMinimize} 
            onFullscreen={onFullscreen} 
            isFullscreen={isFullscreen}
        >
            <div className="cli-window" onClick={() => document.getElementById('cli-input')?.focus()}>
                <div className="terminal-history">
                    {history.map((item, index) => (
                        <div key={index} className="history-item">
                            {item.command && (
                                <div>
                                    <span className="prompt">user@macos ~ %</span>
                                    <span className="command">{item.command}</span>
                                </div>
                            )}
                            {item.output && <div className="output">{item.output}</div>}
                        </div>
                    ))}
                </div>
                <div className="input-area">
                    <span className="prompt">user@macos ~ %</span>
                    <input 
                        id="cli-input"
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)} 
                        onKeyDown={handleCommand}
                        autoComplete="off"
                        autoFocus
                    />
                </div>
                <div ref={bottomRef} />
            </div>
        </MacWindow>
    );
};

export default Cli;