import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout';
import Home from '../pages/home';
import ProductDetail from '../pages/product';
import Login from '../pages/login';
import Register from '../pages/register';
import Dashboard from '../pages/dashboard';
import NewProduct from '../pages/dashboard/new';
import Private from './Private';
import Profile from '../pages/dashboard/profile';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/dashboard',
        element: (
          <Private>
            {' '}
            <Dashboard />{' '}
          </Private>
        ),
      },
      {
        path: '/dashboard/new',
        element: (
          <Private>
            {' '}
            <NewProduct />{' '}
          </Private>
        ),
      },
      {
        path: '/dashboard/profile',
        element: (
          <Private>
            <Profile />
          </Private>
        )
      }
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

export default router;
