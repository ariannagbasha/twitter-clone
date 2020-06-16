import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { connect } from "react-redux";
import { logout } from "../../../redux";
import { Nav, Navbar } from "react-bootstrap";

class Menu extends React.Component {
  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <div id="position">
        <Navbar>
          <Nav id="menu">
            <Nav.Item id="menu">
              <Navbar.Brand id="kwitter-title">Kwitter</Navbar.Brand>
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
        </Navbar>
      </div>
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
