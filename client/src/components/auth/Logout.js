import React, { Component } from "react";
import { logout } from "../../js/actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";

export const Logout = (props) => {
  let submitLogout = () => {
    props.logout();
  };
  return (
    <NavLink onClick={submitLogout} href="#" style={{ color: "red" }}>
      Logout
    </NavLink>
  )
}

export default connect(null, { logout })(Logout);
