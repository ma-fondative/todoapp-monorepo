import React from 'react';
import {
  redirect,
  type LoaderFunctionArgs
} from 'react-router';
import { me } from '@/app/api/auth';
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
  } catch {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    return redirect('/login?' + params.toString());
  }
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
