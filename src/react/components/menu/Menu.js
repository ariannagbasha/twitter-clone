import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { connect } from "react-redux";
import { logout } from "../../../redux";
import { Nav } from "react-bootstrap";

class Menu extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <Nav id="menu">
        <Nav.Item id="menu">
          <h1 id="kwitter-title">Kwitter</h1>
          {this.props.isAuthenticated && (
            <div id="menu-links">
              <Link to="/messagefeed">Message Feed</Link>
              <Link to="/profiles/:username">Profile</Link>
              <Link to="/" onClick={this.handleLogout}>
                Logout
              </Link>
            </div>
          )}
        </Nav.Item>
      </Nav>
    );
  }
}

export default connect(
  state => ({
    result: state.auth.logout.result,
    loading: state.auth.logout.loading,
    error: state.auth.logout.error
  }),
  { logout }
)(Menu);
