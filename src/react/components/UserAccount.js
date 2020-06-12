import React from "react";
// import Spinner from "react-spinkit";
import { user } from "../../redux/usersAccount";
import { connect } from "react-redux";
import "./UserAccount.css";

class UserAccount extends React.Component {
  state = { userInfo: {}};


  componentDidMount() {
    this.setState({userInfo: this.props.user(this.props.result)}) 
    console.log(this.props.user(this.props.result))
    
  }
  

  render() {
    // console.log(this.props.result)
    console.log(this.state.userInfo)
    return (
      <React.Fragment>
          Awesome
    
    
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.login.result,
    loading: state.auth.login.loading,
    error: state.auth.login.error
  }),
  { user }
)(UserAccount);

