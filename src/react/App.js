import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import NotFound from "./NotFound";
import MessageFeed from '../react/components/messages/MessageFeed';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profiles/:username" component={Profile} />
        <Route exact path="/messagefeed" component={MessageFeed} />
        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

export default App;
