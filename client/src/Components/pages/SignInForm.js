import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { login, loginSuccess } from '../../Actions/authActions';
import { connect } from 'react-redux';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errors: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //call function when props has changed
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuth) {
      const { history } = this.props
      history.push('/home'); // push user to Home pages when they login
    }
    if (nextProps.auth.errors) {
      this.setState({
        errors: nextProps.auth.errors
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
    this.props.login(user);

  }

  render() {

    const { errors } = this.state;
    return (
      <div className="FormCenter">
        {errors !== '' ? < Alert variant="danger">
          {errors}
        </Alert> : null
        }

        <Form onSubmit={this.onSubmit} className="FormFields">

          <Form.Group >

            <Form.Label className="FormField__Label" htmlFor="username">Username</Form.Label>
            <Form.Control id="username"
              className="FormField__Input"
              placeholder="Enter your username"
              name="username"
              autoComplete="off"
              required
              value={this.state.username}
              onChange={this.onChange} />
          </Form.Group>

          <Form.Group className="FormField">
            <Form.Label className="FormField__Label" htmlFor="password">Password</Form.Label>
            <Form.Control type="password"
              id="password"
              required
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
        <div className=" btn-social">
          {/* <a href="#" className="btn-face" >
            <i className="fa fa-facebook-official" />
            Facebook
                </a>
          <a href="#" className="btn-google" >
            <i className="fa fa-google" />
            Google
                </a> */}

          {/* <FacebookLogin textButton="Facebook login"
            icon="fa fa-facebook-official"
            appId="2728363200541180" //APP ID NOT CREATED YET
            fields="name,email,picture"
            callback={responseFacebook}
          />



          <GoogleLogin className='gg-btn'
            clientId="650653553725-17na04pnhn0ubafic0047q4tjlr20ti0.apps.googleusercontent.com" //CLIENTID NOT CREATED YET
            buttonText="GOOGLE LOGIN"
            onSuccess={
              responseGoogle
            }
            onFailure={responseGoogle}
          /> */}

        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth,

});

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user)),
  loginSuccess: (data) => dispatch(loginSuccess(data))
})
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm));