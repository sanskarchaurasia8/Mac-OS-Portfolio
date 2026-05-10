import React, { useEffect, useRef } from 'react';
import './contextmenu.scss';

const ContextMenu = ({ x, y, options, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Delay attaching to prevent immediate close if triggered by a click
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Prevent menu from going off-screen
  let posX = x;
  let posY = y;
  
  const spaceBelow = window.innerHeight - y;
  const menuHeight = 220; // estimated max height
  const spaceRight = window.innerWidth - x;
  const menuWidth = 160; // estimated width

  // If near bottom, open upward
  if (spaceBelow < menuHeight) {
    posY -= menuHeight;
  }

  // If near right edge, open leftward
  if (spaceRight < menuWidth) {
    posX -= menuWidth;
  }

  return (
    <div 
      className="context-menu" 
      ref={menuRef}
      style={{ left: posX, top: posY }}
    >
      {options.map((opt, idx) => {
        if (opt.divider) return <div key={idx} className="divider" />;
        return (
          <div 
            key={idx} 
            className={`menu-item ${opt.danger ? 'danger' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              opt.action();
              onClose();
            }}
          >
            {opt.label}
          </div>
        );
      })}
    </div>
  );
};

export default ContextMenu;
