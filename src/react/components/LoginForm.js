import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login, googleLogin } from "../../redux";
import { getMessages } from "../../redux/Messages/getMessages";
import { NavLink } from "react-router-dom";
import {Form} from 'react-bootstrap/';
import {FormControl} from 'react-bootstrap/';
import FormGroup from 'react-bootstrap/Form';


import Button from 'react-bootstrap/Button';
import "./LoginForm.css";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.login(this.state);
    this.props.getMessages();
  };
  // Got this from Vince
  // https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
  loginWithGoogle = () => {
    const authWindow = window.open(
      "https://kwitter-api.herokuapp.com/auth/google/login", //open auth google login, saying that I want the window to be set to something
      "_blank",
      "width=500,height=500"
    );
    authWindow.window.opener.onmessage = (event) => {
      // Whenever that window recieves a messages, it will check everything out and make sure it is sent back
      authWindow.close();
      if (!event || !event.data || !event.data.token) {
        // Need add error handling just in case not able login with google
        // google login failure, dispatch an action here
        return;
      
      }
      this.props.googleLogin(event.data);
    };
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <form id="login-form" onSubmit={this.handleLogin}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            autoFocus
            required
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={this.handleChange}
          />
          <button type="submit" disabled={loading}>
            Login
          </button>
          <button onClick={this.loginWithGoogle}>Login with Google</button>
          {/*Not user register here*/}
          Not Registered Yet ?
          <NavLink to="/registerform" activeClassName="selected">
            Register Form
          </NavLink>
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </React.Fragment>
    );
  }
}

export default connect(
  (state) => ({
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error,
  }),
  { login, getMessages, googleLogin }
)(LoginForm);
