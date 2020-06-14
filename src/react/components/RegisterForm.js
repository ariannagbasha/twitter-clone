import React from "react";
import Spinner from "react-spinkit";
import { connect } from "react-redux";
import { register } from "../../redux";
import { getMessages } from "../../redux/Messages/getMessages";
import { NavLink } from "react-router-dom";
import "./RegisterForm.css";
import { Form, Button } from "react-bootstrap";

class RegisterForm extends React.Component {
  state = { username: "", displayName: "", password: "" };

  handleRegister = e => {
    e.preventDefault();
    this.props.register(this.state);
    this.props.getMessages();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, error } = this.props;
    return (
      <React.Fragment>
        <Form onSubmit={this.handleRegister}>
          <Form.Group controlId="formbasicUsername">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="username"
              autoFocus
              required
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Display Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Display name"
              name="displayName"
              autoFocus
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        Already have a login ?
        <NavLink to="/" activeClassName="selected">
          Login Form
        </NavLink>
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
