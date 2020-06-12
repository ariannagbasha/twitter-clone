import React from "react";
// import Spinner from "react-spinkit";
import { user } from "../../redux/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";

class UserAccount extends React.Component {
  state = { }


  componentDidMount() {
    console.log(this.props.fetchUser())
    // this.setState({userInfo: this.props.fetchUser()})
    
  }
  

  render() {
    
    return (
      <>

      </>
    )
  }
}

export default connect(
  state => ({
    state,
    result: state.auth.login.result,
    user: state.userInfo.user.result,
  }),
  { fetchUser: user }
)(UserAccount);

