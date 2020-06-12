import React from "react";
// import Spinner from "react-spinkit";
import { user } from "../../redux/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";

class UserAccount extends React.Component {
  


  componentDidMount() {
    this.props.fetchUser()
  }
  

  render() {
    // const user = [...this.props.result]
    if(this.props.result === null) {
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
      </>
    )
  }
}

export default connect(
  state => ({
    state,
    result: state.userInfo.user.result,
  }),
  { fetchUser: user }
)(UserAccount);

