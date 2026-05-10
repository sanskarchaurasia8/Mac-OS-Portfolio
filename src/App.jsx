import { useState, useEffect } from 'react';
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
import DocumentViewer from './components/windows/DocumentViewer';
import ContextMenu from './components/ContextMenu';
import { DeleteModal, RenameModal, GetInfoModal } from './components/Modals';

const SYSTEM_APPS = {
  github: { id: 'github', title: 'GitHub', type: 'System App', icon: '/doc-icon/github.png', isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: true },
  note: { id: 'note', title: 'Notes', type: 'System App', icon: '/doc-icon/notepad.png', isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: true },
  resume: { id: 'resume', title: 'Resume', type: 'System App', icon: '/doc-icon/file.png', isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: true },
  spotify: { id: 'spotify', title: 'Spotify', type: 'System App', icon: '/doc-icon/spotify.png', isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: true },
  terminal: { id: 'terminal', title: 'Terminal', type: 'System App', icon: '/doc-icon/terminal.png', isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: true },
  calendar: { id: 'calendar', title: 'Calendar', type: 'System App', icon: '/doc-icon/calendar.png', isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: true },
  mail: { id: 'mail', title: 'Mail', type: 'System App', icon: '/doc-icon/mail.png', isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: true }
};

const SYSTEM_COMPONENTS = {
  github: Github,
  note: Note,
  resume: Resume,
  spotify: Spotify,
  terminal: Cli,
  calendar: Calendar,
  mail: Mail
};

function App() {
  const [apps, setApps] = useState(SYSTEM_APPS);
  const [highestZ, setHighestZ] = useState(10);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0, item: null });
  const [activeModal, setActiveModal] = useState({ type: null, item: null });

  useEffect(() => {
    const saved = localStorage.getItem('macCustomIcons');
    if (saved) {
      try {
        const customItems = JSON.parse(saved);
        const customApps = {};
        customItems.forEach(item => {
          customApps[item.id] = { ...item, isOpen: false, isMinimized: false, isFullscreen: false, zIndex: 10, systemApp: false };
        });
        setApps(prev => ({ ...prev, ...customApps }));
      } catch (e) {
        console.error("Failed to parse custom icons", e);
      }
    }
  }, []);

  const saveCustomApps = (currentApps) => {
    const customItems = Object.values(currentApps).filter(app => !app.systemApp).map(app => ({
      id: app.id, title: app.title, type: app.type, icon: app.icon, data: app.data, createdAt: app.createdAt
    }));
    localStorage.setItem('macCustomIcons', JSON.stringify(customItems));
  };

  const handleAddApp = (newApp) => {
    const appData = {
      ...newApp, isOpen: false, isMinimized: false, isFullscreen: false, zIndex: highestZ + 1, systemApp: false
    };
    setHighestZ(prev => prev + 1);
    setApps(prev => {
      const next = { ...prev, [newApp.id]: appData };
      saveCustomApps(next);
      return next;
    });
  };

  const bringToFront = (appId) => {
    setHighestZ(prev => prev + 1);
    setApps(prev => ({ ...prev, [appId]: { ...prev[appId], zIndex: highestZ + 1 } }));
  };

  const toggleWindow = (appId) => {
    bringToFront(appId);
    setApps(prev => {
      const app = prev[appId];
      if (app.isOpen) {
        if (app.isMinimized) {
          return { ...prev, [appId]: { ...app, isMinimized: false } };
        } else {
          return { ...prev, [appId]: { ...app, isOpen: false } };
        }
      } else {
        return { ...prev, [appId]: { ...app, isOpen: true, isMinimized: false } };
      }
    });
  };

  const closeWindow = (appId) => setApps(prev => ({ ...prev, [appId]: { ...prev[appId], isOpen: false } }));
  const minimizeWindow = (appId) => setApps(prev => ({ ...prev, [appId]: { ...prev[appId], isMinimized: true } }));
  const fullscreenWindow = (appId) => setApps(prev => ({ ...prev, [appId]: { ...prev[appId], isFullscreen: !prev[appId].isFullscreen } }));

  const handleContextMenu = (e, app) => {
    e.preventDefault();
    setContextMenu({ show: true, x: e.clientX, y: e.clientY, item: app });
  };

  const renderWindow = (appId) => {
    const app = apps[appId];
    if (!app.isOpen) return null;
    
    const Component = app.systemApp ? SYSTEM_COMPONENTS[appId] : DocumentViewer;

    return (
      <div 
        key={appId}
        className={`window-wrapper ${app.isMinimized ? 'minimized' : ''}`}
        style={{
          opacity: app.isMinimized ? 0 : 1,
          transform: app.isMinimized ? 'scale(0.8) translateY(50vh)' : 'scale(1) translateY(0)',
          pointerEvents: app.isMinimized ? 'none' : 'auto',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          position: 'absolute',
          inset: 0,
          zIndex: app.isMinimized ? -1 : app.zIndex
        }}
        onMouseDown={() => bringToFront(appId)}
      >
        <Component 
          item={app}
          onClose={() => closeWindow(appId)} 
          onMinimize={() => minimizeWindow(appId)}
          onFullscreen={() => fullscreenWindow(appId)}
          isFullscreen={app.isFullscreen}
          openWindow={(id) => { if (apps[id]) toggleWindow(id); }}
        />
      </div>
    );
  };

  return (
    <main onClick={() => contextMenu.show && setContextMenu({ ...contextMenu, show: false })}>
      <Nav onIconClick={toggleWindow} />

      {Object.keys(apps).map(appId => renderWindow(appId))}

      <Dock 
        apps={Object.values(apps)} 
        onIconClick={toggleWindow} 
        onContextMenu={handleContextMenu}
        onAddApp={handleAddApp}
      />

      {contextMenu.show && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu({ ...contextMenu, show: false })}
          options={[
            { label: 'Open', action: () => toggleWindow(contextMenu.item.id) },
            { label: 'Get Info', action: () => setActiveModal({ type: 'info', item: contextMenu.item }) },
            { divider: true },
            { label: 'Rename', action: () => setActiveModal({ type: 'rename', item: contextMenu.item }) },
            { label: 'Duplicate', action: () => {
                const base = contextMenu.item;
                handleAddApp({ ...base, id: Date.now().toString(), title: base.title + ' copy', createdAt: Date.now() });
              }
            },
            { divider: true },
            { label: 'Delete', danger: true, action: () => {
                if (contextMenu.item.systemApp) {
                  alert("Cannot delete system apps.");
                } else {
                  setActiveModal({ type: 'delete', item: contextMenu.item });
                }
              }
            }
          ]}
        />
      )}

      {activeModal.type === 'delete' && (
        <DeleteModal 
          item={activeModal.item}
          onCancel={() => setActiveModal({ type: null, item: null })}
          onConfirm={() => {
            const id = activeModal.item.id;
            // Trigger smooth delete animation
            setApps(prev => ({ ...prev, [id]: { ...prev[id], isDeleting: true } }));
            
            setTimeout(() => {
              setApps(prev => {
                const next = { ...prev };
                delete next[id];
                saveCustomApps(next);
                return next;
              });
            }, 300);
            
            setActiveModal({ type: null, item: null });
          }}
        />
      )}

      {activeModal.type === 'rename' && (
        <RenameModal 
          item={activeModal.item}
          onCancel={() => setActiveModal({ type: null, item: null })}
          onConfirm={(newName) => {
            setApps(prev => {
              const next = { ...prev, [activeModal.item.id]: { ...prev[activeModal.item.id], title: newName } };
              if (!activeModal.item.systemApp) saveCustomApps(next);
              return next;
            });
            setActiveModal({ type: null, item: null });
          }}
        />
      )}

      {activeModal.type === 'info' && (
        <GetInfoModal 
          item={activeModal.item}
          onClose={() => setActiveModal({ type: null, item: null })}
        />
      )}
    </main>
  );
}

export default App;
