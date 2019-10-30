import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Private } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import FirstPage from './Components/pages/FirstPage'

import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';
import './App.css';
import Game from './Components/Game/Game';
import SignUpForm from './Components/pages/SignUpForm';
import PrivateRoute from './Components/Home/PrivateRoute'
class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>

          <Switch>
            <Route exact path="/" component={FirstPage} />
            <Route path="/game" component={Game} />
            <PrivateRoute path="/home" component={Home} />
          </Switch>


        </div>
      </Router>
    );
  }
}

export default App;
