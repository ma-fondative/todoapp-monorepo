import { RouterProvider } from 'react-router/dom';
import { Toaster } from '@todoapp/ui/components/sonner';
import { router } from './router';

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}
