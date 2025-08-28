import { Link, Outlet } from 'react-router';
import Logo from '@/assets/logo.svg?react';

export function Layout() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <Link to="/" className="flex items-center gap-2 self-center font-medium">
        <Logo />
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Outlet />
      </div>
    </div>
  );
}
