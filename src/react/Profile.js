import React from "react";
import { Menu } from "./components";
import { userIsAuthenticated } from "./HOCs";
import UserAccount from "./components/user-account/UserAccount";

class Profile extends React.Component {
  render() {
    return (
      <>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>
        <UserAccount />
      </>
    );
  }
}

export default userIsAuthenticated(Profile);
