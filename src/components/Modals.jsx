import React, { useState } from 'react';
import './modals.scss';

export const DeleteModal = ({ item, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete "{item.title}"?</h3>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="btn-cancel">Cancel</button>
          <button onClick={onConfirm} className="btn-danger">Delete</button>
        </div>
      </div>
    </div>
  );
};

export const RenameModal = ({ item, onConfirm, onCancel }) => {
  const [name, setName] = useState(item.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onConfirm(name.trim());
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Rename</h3>
        <form onSubmit={handleSubmit}>
          <input 
            autoFocus 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="modal-input"
          />
          <div className="modal-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const GetInfoModal = ({ item, onClose }) => {
  const size = item.data ? `${(item.data.length / 1024).toFixed(2)} KB` : 'Unknown';
  
  return (
    <div className="modal-overlay">
      <div className="modal-content info-modal">
        <div className="info-header">
          <img src={item.icon} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
        <div className="info-body">
          <p><strong>Kind:</strong> {item.type || 'System App'}</p>
          <p><strong>Size:</strong> {size}</p>
          <p><strong>Created:</strong> {item.createdAt ? new Date(item.createdAt).toLocaleString() : 'System Default'}</p>
          <p><strong>ID:</strong> {item.id}</p>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-primary">Close</button>
        </div>
      </div>
    </div>
  );
};
