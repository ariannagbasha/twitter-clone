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
      
  <Navbar bg="dark" variant="dark">
      <Nav id="menu">
        <Nav.Item id="menu">
          <Navbar.Brand id="kwitter-title">Kwitter</Navbar.Brand>
          {this.props.isAuthenticated && (
            <div id="menu-links">
              <Nav.Link to="/messagefeed">Message Feed</Nav.Link>
              <Nav.Link to="/profiles/:username">Profile</Nav.Link>
              <Nav.Link to="/" onClick={this.handleLogout}>
                Logout
              </Nav.Link>
            </div>
          )}
        </Nav.Item>
      </Nav>
      </Navbar>

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
