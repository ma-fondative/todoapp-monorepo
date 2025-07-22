import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <>
      <h1>Auth Layout</h1>
      <Outlet />
    </>
  );
}
