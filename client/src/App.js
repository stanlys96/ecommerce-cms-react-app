import logo from './logo.svg';
import './App.css';
import routes from './routes';
import { Switch, Route, useHistory } from 'react-router-dom';

function App() {
  return (
    <div className="App">
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
