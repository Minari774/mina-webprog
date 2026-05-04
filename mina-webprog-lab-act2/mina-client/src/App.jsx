import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages & Layout
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import DashLayout from './layouts/DashLayout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
