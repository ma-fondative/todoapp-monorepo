import { Outlet } from 'react-router';
import Logo from '@/assets/logo.svg?react';

export function AuthLayout() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <a href="#" className="flex items-center gap-2 self-center font-medium">
        <Logo />
      </a>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Outlet />
      </div>
    </div>
  );
}
