import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import FirstPage from './Components/pages/FirstPage'
import SignUpForm from './Components/pages/SignUpForm';
import SignInForm from './Components/pages/SignInForm';
import Home from './Components/Home/Home';
import Menu from './Components/Menu/Menu';
import './App.css';
import Game from './Components/Game/Game';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <main>
          <Switch>

            <Route exact path="/" component={FirstPage} />

            <Route path="/home" component={Home} />
            <Route path="/game" component={Game} />
          </Switch>
        </main>
      </Router>
    );
  }
}

export default App;
