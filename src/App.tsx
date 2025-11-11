import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import Router from './routes/Router';
import { AdminProvider } from './context/AdminContext';

const browserRouter = createBrowserRouter(Router);

function App() {
  return (
    <AdminProvider>
      <Toaster position="bottom-right" richColors />
      <RouterProvider router={browserRouter} />
    </AdminProvider>
  );
}

export default App;
