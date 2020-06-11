import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
// import userAccount from "./components/UserAccount";

class Profile extends React.Component {
  render() {
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>
        {/* <userAccount /> */}
      </>
    );
  }
}

export default userIsAuthenticated(Profile);
