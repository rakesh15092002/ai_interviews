// app/(auth)/AuthLayout.tsx or wherever your layout is

import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation'; // ✅ CORRECT import
import React, { ReactNode } from 'react';

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    redirect('/'); // ✅ Redirect authenticated user to home
  }

  return (
    <div className="auth-layout">
      {children}
    </div>
  );
};

export default AuthLayout;
