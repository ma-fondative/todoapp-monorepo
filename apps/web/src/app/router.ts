import { createBrowserRouter } from 'react-router';
import { NotFound } from './routes/not-found';
import { Layout as AppLayout } from './routes/layout';
import { loader as authGuardLoader } from './routes/auth-guard';
import { Layout as AuthLayout } from './routes/auth/layout';
import { ErrorBoundary } from './routes/error-boundary';
import { Loading } from './routes/loading';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    ErrorBoundary: ErrorBoundary,
    HydrateFallback: Loading,
    loader: authGuardLoader,
    shouldRevalidate: () => false,
    children: [
      {
        index: true,
        lazy: async () => import('./routes/root')
      },
      {
        path: '/users',
        lazy: async () => import('./routes/users/users-list')
      }
    ]
  },
  {
    Component: AuthLayout,
    ErrorBoundary: ErrorBoundary,
    HydrateFallback: Loading,
    children: [
      {
        path: '/login',
        lazy: async () => import('./routes/auth/login')
      },
      {
        path: '/register',
        lazy: async () => import('./routes/auth/register')
      },
      {
        path: '/forgot-password',
        lazy: async () => import('./routes/auth/forgot-password')
      }
    ]
  },
  {
    path: '*',
    Component: NotFound
  }
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
