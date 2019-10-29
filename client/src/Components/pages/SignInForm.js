import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { login } from '../../Actions/userActions'

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    login(user).then(res => {
      if (res) {
        this.props.history.push(`/profile`)
      }
    })
  }

  render() {
    return (
      <div className="FormCenter">
        <Form onSubmit={this.onSubmit} className="FormFields">
          <Form.Group >
            <Form.Label className="FormField__Label" htmlFor="username">Username</Form.Label>
            <Form.Control id="username"
              className="FormField__Input"
              placeholder="Enter your username"
              name="username"
              autoComplete="off"
              value={this.state.username}
              onChange={this.onChange} />
          </Form.Group>

          <Form.Group className="FormField">
            <Form.Label className="FormField__Label" htmlFor="password">Password</Form.Label>
            <Form.Control type="password"
              id="password"
              className="FormField__Input"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.onChange} />
          </Form.Group>

          <Form.Group className="FormField">
            <Button type="submit" className="FormField__Button mr-20">Sign In</Button> <Link to="/" className="FormField__Link">Create an account</Link>
          </Form.Group>
        </Form>
        <div className="row btn-social">
          <a href="#" className="btn-face" >
            <i className="fa fa-facebook-official" />
            Facebook
                </a>
          <a href="#" className="btn-google" >
            <i className="fa fa-google" />
            Google
                </a>
        </div>
      </div>
    );
  }
}

export default SignInForm;
