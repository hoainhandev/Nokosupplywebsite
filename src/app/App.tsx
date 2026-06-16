import { RouterProvider } from 'react-router';
import { Toaster } from 'sonner';
import { router } from './routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
