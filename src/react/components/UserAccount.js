import React from "react";
// import Spinner from "react-spinkit";
import { user } from "../../redux/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";

class UserAccount extends React.Component {
  state = { info: "" };


  componentWillMount() {
     this.props.user(this.props.username)
    
  }
  

  render() {
    console.log(this.props.userInfo)
    return (
      <React.Fragment>
          Awesome
    
    
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    username: state.auth.login.result.username,
    userInfo: state.userInfo,
    error: state.auth.login.error
  }),
  { user }
)(UserAccount);

