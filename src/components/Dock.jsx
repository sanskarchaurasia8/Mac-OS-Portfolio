import React, { useState, useRef } from 'react';
import './dock.scss';

const Dock = ({ apps, onIconClick, onContextMenu, onAddApp }) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const fileInputRef = useRef(null);

  const handleAddClick = () => {
    setShowAddMenu(!showAddMenu);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target.result;
      const newItem = {
        id: Date.now().toString(),
        title: file.name,
        type: file.type,
        data: base64Data,
        icon: '/doc-icon/file.png',
        createdAt: Date.now()
      };
      
      onAddApp(newItem);
      setShowAddMenu(false);
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <footer className="dock">
      {apps.map(app => (
        <div 
          className={`icon ${app.isOpen ? 'open' : ''} ${app.isDeleting ? 'deleting' : ''}`} 
          key={app.id} 
          onClick={() => onIconClick(app.id)} 
          onContextMenu={(e) => onContextMenu(e, app)}
          onDoubleClick={(e) => {
            e.preventDefault();
            onContextMenu(e, app);
          }}
          title={app.title}
        >
          <img src={app.icon} alt={app.title} />
          {app.isOpen && <div className="indicator"></div>}
        </div>
      ))}

      <div className="add-wrapper">
        <div className="add-icon" onClick={handleAddClick} title="Add New">+</div>
        {showAddMenu && (
          <div className="add-menu">
            <button onClick={triggerFileInput}>Add Document</button>
            <button onClick={triggerFileInput}>Add Notes</button>
          </div>
        )}
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileSelect} 
      />
    </footer>
  );
};

export default Dock;