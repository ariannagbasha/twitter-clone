import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { login, googleLogin } from "../../redux";
import { getMessages } from "../../redux/Messages/getMessages";
import "./LoginForm.css";
import { GoogleLogin } from "react-google-login";

class LoginForm extends React.Component {
  state = { username: "", password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.login(this.state);
    this.props.getMessages();
  };
  responseGoogle = response => {
    console.log(response);
    const googleInfo = {
      username: response.profileObj.givenName,
      password: response.profileObj.familyName
    };
    this.props.login(googleInfo);
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
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
          <GoogleLogin
            clientId="968913697208-hu25spo2drs955acb3j8fp5cin2sshr3.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          ,{/*Not user register here*/}
          {/*Naviagation button register here*/}
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
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
