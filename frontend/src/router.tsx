import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { MainLayout } from './layouts';
import HomePage from './pages/HomePage';
import { ErrorPage } from './pages';

const router: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/*',
    element: <ErrorPage />,
  },
];

const browserRouter = createBrowserRouter(router);

export { browserRouter as router };
