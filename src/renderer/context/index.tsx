import React, { ReactNode } from 'react';
import { AuthProvider } from '@pages/login-register/auth-context';

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
