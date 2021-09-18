import './App.css';
import routes from './routes';
import Navbar from './components/Navbar';
import React, { useEffect } from "react";
import { Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRouteDashboard from './routes/ProtectedRouteDashboard';
import ProtectedRouteHome from './routes/ProtectedRouteHome';

function App() {
  const status = useSelector(state => state.user.status);
  useEffect(() => {

  }, [status]);
  return (
    <div>
      <Navbar />
      <Switch>
        <ProtectedRouteHome
          path="/"
          component={Home}
          isAuth={status} key={1} exact />
        <ProtectedRouteHome
          path="/login"
          component={Login}
          isAuth={status} key={2} exact />
        <ProtectedRouteDashboard path="/dashboard" component={Dashboard} isAuth={status} key={3} exact />
      </Switch>
    </div>
  );
}

export default App;
