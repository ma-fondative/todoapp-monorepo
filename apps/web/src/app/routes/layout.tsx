import { Outlet, useLoaderData } from 'react-router';
import { type UserResponse } from '@todoapp/api/types/users';
import { AuthGuard } from './auth-guard';
import { Header } from '@/components/layout/header';

export function Layout() {
  const user = useLoaderData() as UserResponse;

  return (
    <AuthGuard>
      <div className="flex min-h-svh flex-col">
        <Header user={user} />
        <main className="flex flex-1 p-2 md:p-4">
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
