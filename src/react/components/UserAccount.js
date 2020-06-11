import React from "react";
// import Spinner from "react-spinkit";
import { user } from "../../redux/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";

class UserAccount extends React.Component {
  state = {};


  componentDidMount() {
     this.props.user(this.props.username)
    
  }
  

  render() {
    console.log(this.props.result)
    return (
      <React.Fragment>
          Awesome
    
    
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result.username,
    loading: state.auth.user,
    error: state.auth.user
  }),
  { user }
)(UserAccount);

