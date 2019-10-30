import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { register } from '../../Actions/authActions'
import { connect } from 'react-redux';
class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      username: this.state.username,
      password: this.state.password
    }
    this.props.register(user, this.props.history)
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="FormCenter">
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Label className="FormField__Label" htmlFor="name">Username</Form.Label>
            <Form.Control type="text" id="username" className="FormField__Input" placeholder="Enter your full name" name="username" value={this.state.username} onChange={this.onChange} autoComplete="off" />
          </Form.Group>
          <Form.Group>
            <Form.Label className="FormField__Label" htmlFor="password">Password</Form.Label>
            <Form.Control type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.onChange} />
          </Form.Group>
          <Form.Group >
            <Form.Label className="FormField__Label" htmlFor="username">Confirm Password</Form.Label>
            <Form.Control type="password" id="password2" className="FormField__Input" placeholder="Confirm your password" name="password2" value={this.state.password2} onChange={this.onChange} />
          </Form.Group>



          <div className="FormField">
            <Button type="submit" className="FormField__Button mr-20">Sign Up</Button> <Link to="/" className="FormField__Link">I'm already member</Link>
          </div>

          <span className="red-text">{errors.password2}</span>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { register })(withRouter(SignUpForm));
