import React from "react";
import { user } from "../../redux/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";
import { getUsers } from '../../redux/getUsers';




class UserAccount extends React.Component {
  


  componentDidMount() {
    this.props.fetchUser()
    this.props.getUsers()
  }
  

  render() {
    // const user = [...this.props.result]
    if(this.props.result === null || this.props.users === null) {
      return(
        <>

        </>
      )
    }
    return (
      <>
      <p>Created At: {this.props.result.createdAt}</p>
      <p>Display Name: {this.props.result.displayName}</p> 
      <p>Username: {this.props.result.username}</p> 
      <p>Updated At: {this.props.result.updatedAt}</p> 
      <p>User: {this.props.users}</p>
      </>
    )
  }
}

export default connect(
  state => ({
    state,
    result: state.userInfo.user.result,
    users: state.getUsers.getUsers.result
  }),
  { fetchUser: user, getUsers }
)(UserAccount);

