// app/(admin)/dashboard/layout.tsx
import React from 'react';
import { ProtectedRoute } from '@/component/ProtectedRoute';
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return ( 
      <div>  
          <ProtectedRoute>
              {children}
          </ProtectedRoute> 
      </div> 
  );
}
