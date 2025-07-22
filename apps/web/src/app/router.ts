import { createBrowserRouter } from 'react-router';
import { NotFound } from './routes/not-found';
import { AppLayout } from './layouts/app-layout';
import { AuthLayout } from './layouts/auth-layout';

export const router = createBrowserRouter([
  {
    Component: AppLayout,
    children: [
      {
        index: true,
        lazy: async () => import('./routes/home')
      }
    ]
  },
  {
    Component: AuthLayout,
    children: [
      {
        path: '/login',
        lazy: async () => import('./routes/auth/login')
      },
      {
        path: '/register',
        lazy: async () => import('./routes/auth/register')
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
