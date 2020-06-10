import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { register } from "../../redux";
import { getMessages } from '../../redux/Messages/getMessages';
import "./RegisterForm.css";

class RegisterForm extends React.Component {
  state = { username: "", displayName: "" , password: "" };

  handleLogin = e => {
    e.preventDefault();
    this.props.register(this.state);
    this.props.getMessages()
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <form id="register-form" onSubmit={this.handleLogin}>
          <label htmlFor="username"> Set Username</label>
          <input
            type="text"
            name="username"
            autoFocus
            required
            onChange={this.handleChange}
          />
          <label htmlFor="displayname"> Set Display Name</label>
          <input
            type="text"
            name="displayName"
            autoFocus
            required
            onChange={this.handleChange}
          />
          <label htmlFor="password">Set Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={this.handleChange}
          />
          <button type="submit" disabled={loading}>
            Register
          </button>
        </form>
        {loading && <Spinner name="circle" color="blue" />}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.users.register.result,
    loading: state.users.register.loading,
    error: state.users.register.error
  }),
  { register, getMessages }
)(RegisterForm);