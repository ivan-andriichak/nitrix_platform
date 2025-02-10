import {createBrowserRouter, RouteObject} from 'react-router-dom';
import {MainLayout} from './layouts';
import {ErrorPage, HomePage} from './pages';

const router: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      }
    ]
  },
  {
    path: '/*',
    element: <ErrorPage/>
  }
];

const browserRouter = createBrowserRouter(router);

export {
  browserRouter as router
};
