import React, { Component } from 'react';
import { Link, withRouter, NavLink } from 'react-router-dom';
import { Form, Button, Image } from 'react-bootstrap';
import { register } from '../../Actions/authActions'
import { connect } from 'react-redux';
import logoxo from '../../logoxo.png'
import '../../App.css';
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      username: '',
      password: '',
      password2: '',
      errors: {}

    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      fullname: this.state.fullname,
      username: this.state.username,
      password: this.state.password
    }
    this.props.register(user, this.props.history)
  }

  render() {
    const { errors } = this.state;

    return (

      <div className="App">
        <div className="App__Aside">
          <Image src={logoxo} fluid />
        </div>
        <div className="App__Form">
          <div className="PageSwitcher">
            <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
            <NavLink to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item PageSwitcher__Item--Active">Sign Up</NavLink>
          </div>

          <div className="FormTitle">
            <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
            or
             <NavLink to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link FormTitle__Link--Active">Sign Up</NavLink>
          </div>


          <div className="FormCenter">
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Label className="FormField__Label" htmlFor="fullname">Full name</Form.Label>
                <Form.Control type="text" id="fullname"
                  className="FormField__Input"
                  placeholder="Enter your full name"
                  name="fullname"
                  required
                  value={this.state.fullname}
                  onChange={this.onChange} autoComplete="off" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="FormField__Label" htmlFor="name">Username</Form.Label>
                <Form.Control type="text" id="username"
                  className="FormField__Input"
                  placeholder="Enter your username"
                  name="username"
                  required
                  value={this.state.username}
                  onChange={this.onChange} autoComplete="off" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="FormField__Label"
                  htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password" id="password"
                  className="FormField__Input"
                  placeholder="Enter your password"
                  name="password"
                  required
                  value={this.state.password}
                  onChange={this.onChange} />
              </Form.Group>
              <Form.Group >
                <Form.Label className="FormField__Label" htmlFor="username">Confirm Password</Form.Label>
                <Form.Control type="password"
                  id="password2"
                  className="FormField__Input"
                  placeholder="Confirm your password"
                  name="password2"
                  required
                  value={this.state.password2}
                  onChange={this.onChange} />
              </Form.Group>



              <div className="FormField">
                <Button type="submit" className="FormField__Button mr-20">Sign Up</Button> <Link to="/" className="FormField__Link">I'm already member</Link>
              </div>

              <span className="red-text">{errors.password2}</span>
            </Form>
          </div>
        </div>

      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { register })(withRouter(SignUpForm));
