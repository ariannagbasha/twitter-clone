import React, { Component } from "react";
import Menu from "../menu/Menu";
import { userIsAuthenticated } from "../../HOCs";
import { connect } from "react-redux";
import { getMessages } from "../../../redux/Messages/getMessages";
import NewMessages from "./NewMessages";
import { deleteMessages } from "../../../redux/Messages/deleteMessages";
import { handleLike, handleUnlike } from "../../../redux/Messages/likeMessages";
import { Card, Button } from "react-bootstrap";
import "./MessageFeed.css";

class MessageFeed extends Component {
  state = {
    messages: [],
    loading: false,
    messageId: 0,
    likes: false,
  };

  componentDidMount() {
    this.props.getMessages();
  }

  handleLikes = id => event => {
    console.log(id);
    this.props.handleLike(id);
    this.setState({likes: !this.state.likes})
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
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <NewMessages />
        <h1 id="header-center">Message Feed</h1>
        {this.props.messages.map(message => (
          <React.Fragment key={message.id}>
            <div id="center" key={message.id}>
              <Card style={{ width: "50rem" }}>
                <h6>Author: {message.username}</h6>
                <Card.Text>Text: {message.text}</Card.Text>
                <p>Date: {message.createdAt}</p>
                <p>likes: {message.likes.length}</p>

                <Button
                  variant="primary"
                  onClick={this.handleLikes(message.id)}
                >
                  {this.handleLikes(message.id) ? "Like" : "Unlike"}
                </Button>
               
              </Card>
              {message.username === this.props.user.username && (
                  <Button onClick={event =>this.props.deleteMessages(event, message.id)}>
                    Delete Message
                  </Button>
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
