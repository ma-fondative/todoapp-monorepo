import {
  Outlet,
  redirect,
  type LoaderFunctionArgs,
  useLoaderData
} from 'react-router';
import { me } from '@/app/api/auth';
import { type UserResponse } from '@todoapp/api/types/users';
import { AUTH_TOKEN_KEY } from '@/constants/auth';

export async function loader({ request }: LoaderFunctionArgs) {
  const params = new URLSearchParams({
    redirectTo: new URL(request.url).pathname
  });

  if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
    return redirect('/login?' + params.toString());
  }

  try {
    return await me();
  } catch (e) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    throw e;
  }
}

export function AppLayout() {
  const user = useLoaderData() as UserResponse;

  return (
    <>
      <h1>App Layout</h1>
      <p>Welcome, {user?.email}!</p>
      <Outlet />
    </>
  );
}
