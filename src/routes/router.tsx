import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/layout";
import Home from "../pages/home";
import ProductDetail from "../pages/product";
import Login from "../pages/login";
import Register from "../pages/register";
import Dashboard from "../pages/dashboard";
import NewProduct from "../pages/dashboard/new";

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/product/:id',
        element: <ProductDetail/>
      },
      {
        path: '/dashboard',
        element: <Dashboard/>
      },
      {
        path: '/dashboard/new',
        element: <NewProduct/>
      },
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  }
])

export default router;