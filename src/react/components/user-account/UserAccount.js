import React from "react";
import { user } from "../../../redux/Users/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";
import { getUsers } from "../../../redux/Users/getUsers";
import { Card } from "react-bootstrap";

class UserAccount extends React.Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.getUsers();
  }

  render() {
    // const user = [...this.props.result]
    if (this.props.result === null || this.props.users === null) {
      return <></>;
    }
    return (
      <>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>User General Info</Card.Title>
            <Card.Text>
              <p>Created At: {this.props.result.createdAt}</p>
              <p>Display Name: {this.props.result.displayName}</p>
              <p>Username: {this.props.result.username}</p>
              <p>Updated At: {this.props.result.updatedAt}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default connect(
  (state) => ({
    state,
    result: state.userInfo.user.result,
    // users: state.getUsers.getUsers.result
  }),
  { fetchUser: user, getUsers }
)(UserAccount);
