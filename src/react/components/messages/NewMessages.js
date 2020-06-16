import React, { Component } from "react";
import { connect } from "react-redux";
import { newMessages } from "../../../redux/Messages/NewMessages";
import { Form, FormControl } from "react-bootstrap";

class NewMessages extends Component {
  state = {
    message: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleMessage = e => {
    e.preventDefault();
    this.props.newMessages(this.state.message);
    this.setState({ message: "" });
  };

  render() {
    return (
      <>
        <Form id="NewMessages">
          <Form.Label htmlFor="message">What's on your mind?</Form.Label>
          <Form.Control
            type="text"
            placeholder="New Messsage"
            name="message"
            autoFocus
            required
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted"></Form.Text>
        </Form>
        <button onClick={this.handleMessage} type="submit">
          Post New Message
        </button>
      </>
    );
  }
}

export default connect(null, { newMessages })(NewMessages);
