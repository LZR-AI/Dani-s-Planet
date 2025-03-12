import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Gallery from './pages/Gallery.tsx';
import Store from './pages/Store.tsx';
import About from './pages/About.tsx';
import Privacy from './pages/Privacy.tsx';
import Subscribe from './pages/Subscribe.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/gallery',
    element: <Gallery />,
  },
  {
    path: '/store',
    element: <Store />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
  {
    path: '/subscribe',
    element: <Subscribe />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
