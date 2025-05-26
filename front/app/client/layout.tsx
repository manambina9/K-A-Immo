// app/(client)/[id]/layout.tsx
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return ( 
      <div>
        <header className="bg-green-600 text-white p-4">Espace Client</header>
        <main className="p-6 bg-green-50 min-h-screen">{children}</main>
      </div>
  );
}
