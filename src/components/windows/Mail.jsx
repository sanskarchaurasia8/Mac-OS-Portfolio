import React from 'react';
import MacWindow from './MacWindow';

const Mail = ({ onClose }) => {
  const emails = [
    { id: 1, sender: 'Apple', subject: 'Your Receipt', date: 'Yesterday', icon: '' },
    { id: 2, sender: 'GitHub', subject: 'Your GitHub Star Count Just Went Up!', date: '2 days ago', icon: 'G' },
    { id: 3, sender: 'Spotify', subject: 'New Music for You', date: '3 days ago', icon: 'S' },
    { id: 4, sender: 'LinkedIn', subject: 'You have new notifications', date: '5 days ago', icon: 'L' }
  ];

  return (
    <MacWindow title="Mail" onClose={onClose}>
      <div style={{
        display: 'flex',
        height: '100%',
        color: '#fff',
        fontFamily: 'Inter, sans-serif'
      }}>
        {/* Sidebar */}
        <div style={{
          width: '30%',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '1rem'
        }}>
          <h3 style={{ marginBottom: '1.5rem', opacity: 0.8 }}>Inbox</h3>
          {emails.map(email => (
            <div key={email.id} style={{
              padding: '0.75rem',
              borderRadius: '0.75rem',
              backgroundColor: email.id === 1 ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              marginBottom: '0.5rem',
              cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{email.sender}</span>
                <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>{email.date}</span>
              </div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {email.subject}
              </div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: '#fff',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              marginRight: '1rem'
            }}></div>
            <div>
              <h1 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Your Receipt</h1>
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>From: Apple &lt;no_reply@apple.com&gt;</span>
            </div>
          </div>
          <div style={{ lineHeight: '1.6', opacity: 0.9 }}>
            <p>Dear Sanskar,</p>
            <p>Thank you for your recent purchase on the App Store. Your transaction was successful.</p>
            <p style={{ marginTop: '1rem' }}>Total: $0.00</p>
            <p>Order ID: #AAPL-99238475</p>
            <p style={{ marginTop: '2rem' }}>Best regards,<br />Apple Support</p>
          </div>
        </div>
      </div>
    </MacWindow>
  );
};

export default Mail;
