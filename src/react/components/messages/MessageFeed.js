import React, { Component } from "react";
import Menu from "../menu/Menu";
import { userIsAuthenticated } from "../../HOCs";
import { connect } from "react-redux";
import { getMessages } from "../../../redux/Messages/getMessages";
import NewMessages from "./NewMessages";
import { deleteMessages } from "../../../redux/Messages/deleteMessages";
import { handleLike, handleUnlike } from "../../../redux/Messages/likeMessages";
import { Card } from "react-bootstrap";

class MessageFeed extends Component {
  state = {
    messages: [],
    loading: false,
    messageId: 0
  };

  componentDidMount() {
    this.props.getMessages();
  }

  handleLikes = id => event => {
    console.log(id);
    this.props.handleLike(id);
  };

  render() {
    //create form "text box" start user

    if (this.props.messages === null || this.props.user === null) {
      return (
        <>
          <Menu isAuthenticated={this.props.isAuthenticated} />
          <NewMessages />
          <h1>Message Feed without Messages</h1>
        </>
      );
    }
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <NewMessages />
        <h1>Message Feed WITH Messages</h1>
        {this.props.messages.map(message => (
          <React.Fragment key={message.id}>
            <div key={message.id}>
              <h6>Author: {message.username}</h6>
              <p>Text: {message.text}</p>
              <p>Date: {message.createdAt}</p>
              <p>likes: {message.likes.length}</p>
              <button onClick={this.handleLikes(message.id)}>
                Like Message
              </button>
              {message.username === this.props.user.username && (
                <button
                  onClick={event =>
                    this.props.deleteMessages(event, message.id)
                  }
                >
                  Delete Message
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    //this is where we connect the info from our store to our react props
    messages: state.messages.getMessages.result,
    user: state.auth.login.result
  };
};

const mapDispatchToProps = {
  //this where we connect actions/functions to our react
  getMessages,
  deleteMessages,
  handleLike,
  handleUnlike
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(userIsAuthenticated(MessageFeed));
