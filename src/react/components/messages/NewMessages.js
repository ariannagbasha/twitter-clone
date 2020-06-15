import React, { Component } from "react";
import { connect } from "react-redux";
import { newMessages } from "../../../redux/Messages/NewMessages";

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
        <form id="NewMessages">
          <label htmlFor="message">Message</label>
          <input
            type="text"
            name="message"
            autoFocus
            required
            onChange={this.handleChange}
          />
        </form>
        <button onClick={this.handleMessage} type="submit">
          New Message Posted
        </button>
      </>
    );
  }
}

export default connect(null, { newMessages })(NewMessages);
