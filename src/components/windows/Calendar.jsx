import React from 'react';
import MacWindow from './MacWindow';

const Calendar = ({ onClose }) => {
  return (
    <MacWindow title="Calendar" onClose={onClose}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
        color: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        <h2 style={{ marginBottom: '1.5rem' }}>{new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '1rem',
          textAlign: 'center'
        }}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} style={{ fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>{day}</div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
            <div key={date} style={{
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: date === new Date().getDate() ? '#ff3b30' : 'transparent',
              color: date === new Date().getDate() ? '#fff' : 'inherit'
            }}>
              {date}
            </div>
          ))}
        </div>
      </div>
    </MacWindow>
  );
};

export default Calendar;
