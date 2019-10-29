import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { register } from '../../Actions/userActions'

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',

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
    register(user).then(res => {

      this.props.history.push(`/sign-in`)

    })
  }

  render() {
    return (
      <div className="FormCenter">
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label className="FormField__Label" htmlFor="name">Username</Form.Label>
            <Form.Control type="text" id="username" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.onChange} autoComplete="off" />
          </Form.Group>
          <Form.Group>
            <Form.Label className="FormField__Label" htmlFor="password">Password</Form.Label>
            <Form.Control type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange} />
          </Form.Group>
          <Form.Group >
            <Form.Label className="FormField__Label" htmlFor="username">Confirm Password</Form.Label>
            <Form.Control type="password" id="password" className="FormField__Input" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.onChange} />
          </Form.Group>



          <div className="FormField">
            <Button type="submit" className="FormField__Button mr-20">Sign Up</Button> <Link to="/sign-in" className="FormField__Link">I'm already member</Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
