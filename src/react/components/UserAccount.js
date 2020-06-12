import React from "react";
// import Spinner from "react-spinkit";
import { user } from "../../redux/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";

class UserAccount extends React.Component {
  state = {}


  componentDidMount() {
    this.props.user()
    
    
  }
  

  render() {
    // console.log(this.props.result)
    console.log(this.props.user)
    return (
      <React.Fragment>
           {/* {this.props.user(this.props.result)} */}
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result,
    user: state.userInfo.user.result,
  }),
  { user }
)(UserAccount);

