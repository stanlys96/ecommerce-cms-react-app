import Home from '../pages/Home';
import Login from '../pages/Login';

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
  }
];

export default routes;