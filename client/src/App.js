import './App.css';
import routes from './routes';
import Navbar from './components/Navbar';
import { Switch, Route, useHistory } from 'react-router-dom';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        {routes.map((res) => (
          <Route 
            key={res.id}
            path={res.path}
            component={res.component}
            exact={res.exact}
          />
        ))}
      </Switch>
    </div>
  );
}

export default App;
