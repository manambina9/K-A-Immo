'use client';

import { useState } from 'react';

export default function DemandeVisiteForm({ maisonId, token }: { maisonId: number; token: string }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch(`http://localhost:8000/api/maisons/${maisonId}/visites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // JWT si vous l’utilisez
      },
      body: JSON.stringify({ message }),
    });

    if (res.ok) {
      setStatus('success');
      setMessage('');
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        className="border p-2 w-full"
        placeholder="Votre message (facultatif)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Envoyer la demande
      </button>
      {status === 'success' && <p className="text-green-500">Demande envoyée !</p>}
      {status === 'error' && <p className="text-red-500">Erreur lors de l’envoi.</p>}
    </form>
  );
}
