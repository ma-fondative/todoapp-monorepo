import { createBrowserRouter } from 'react-router';
import { NotFound } from './routes/not-found';
import { AppLayout, loader as appLoader } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';
import { ErrorBoundary } from './routes/error-boundary';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    ErrorBoundary: ErrorBoundary,
    loader: appLoader,
    children: [
      {
        index: true,
        lazy: async () => import('./routes/home')
      }
    ]
  },
  {
    Component: AuthLayout,
    ErrorBoundary: ErrorBoundary,
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
