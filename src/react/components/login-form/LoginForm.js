import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login, googleLogin } from "../../../redux";
import { getMessages } from "../../../redux/Messages/getMessages";
import { NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "./LoginForm.css";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
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
    authWindow.window.opener.onmessage = event => {
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        {/* <div id="box"> */}
        <div id="middle">
          <Form id="login-form" onSubmit={this.handleLogin}>
            <Form.Group controlId="formBasicUsername">
              {/* <Form.Label>Username</Form.Label> */}
              <Form.Control
                width="100px"
                type="text"
                name="username"
                autoFocus
                required
                onChange={this.handleChange}
                placeholder="Username"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              {/* <Form.Label>Password</Form.Label> */}
              <Form.Control
                type="password"
                name="password"
                required
                onChange={this.handleChange}
                placeholder="Password"
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              Submit
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={this.loginWithGoogle}
            >
              Login With Google
            </Button>
          </Form>

          <div id="link">
            <h6>Not Registered Yet ?</h6>
            <NavLink to="/registerform" activeClassName="selected">
              Register Form
            </NavLink>
          </div>
          {loading && <Spinner name="circle" color="blue" />}
          {error && <p style={{ color: "red" }}>{error.message}</p>}
          {/* </div> */}
        </div>
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { login, getMessages, googleLogin }
)(LoginForm);
