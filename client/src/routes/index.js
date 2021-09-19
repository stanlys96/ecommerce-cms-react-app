import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Products';

const routes = [
  {
    id: 1,
    name: 'HomePage',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    id: 2,
    name: 'LoginPage',
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    id: 3,
    name: 'DashboardPage',
    path: '/dashboard',
    component: Dashboard,
    exact: true,
  }
];

export default routes;