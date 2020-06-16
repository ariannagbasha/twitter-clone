import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import MessageFeed from '../react/components/messages/MessageFeed';
import { RegisterForm } from "./components";

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profiles/:username" component={Profile} />
        <Route exact path="/messagefeed" component={MessageFeed} />
        <Route exact path="/registerform" component={RegisterForm} />
       {/* Where do we want the register form to be ? Hyperlink button to register page and register form as our component */}
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
