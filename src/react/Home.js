import React from "react";
import { LoginForm, Menu} from "./components";
import { userIsNotAuthenticated } from "./HOCs";
import "./Home.css";

class Home extends React.Component {
  render() {
    return (
      <>
      <div id="log-in">
        <Menu />
        <h2>Your favorite microblogging platform</h2>
        <LoginForm />
        </div>
      </>
    );
  }
}

export default userIsNotAuthenticated(Home);
