import React from 'react';
import { BrowserRouter, Route, Link, NavLink, Switch } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';


import logoxo from '../../logoxo.png'
import '../../App.css';

class FirstPage extends React.PureComponent {
    render() {
        return (

            <div className="App">
                <div className="App__Aside">
                    <Image src={logoxo} fluid />
                </div>
                <div className="App__Form">
                    <div className="PageSwitcher">
                        <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                        <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                    </div>

                    <div className="FormTitle">
                        <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
                        or
                            <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
                    </div>
                    <Switch>
                        <Route exact path="/" component={SignInForm} />
                        <Route path="/sign-up" component={SignUpForm} />
                    </Switch>
                </div>

            </div>



        );
    }
}

export default FirstPage;
