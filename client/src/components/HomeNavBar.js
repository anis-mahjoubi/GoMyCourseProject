import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Form,
  Input,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Link } from "react-router-dom";
import ModalLogin from "./auth/ModalLogin";
import ModalSignup from "./auth/ModalSignup";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import NewCourseModal from "./CourseCRUD/NewCourseModal";
import SearchModal from "./Courses/SearchModal";

class HomeNavBar extends Component {
  state = {
    isOpen: false,
  };
  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  reasurchHandle = () => {};
  reasurchValidation = (e) => {
    e.preventDefault();
    alert("search");
  };
  render() {
    const logedNav = (
      <>
        {/* <Form className="inline" onSubmit={this.reasurchValidation}>
          <SearchModal/>
        </Form> */}
        <Link to="/courses" className="nav-item font-weight-bold">Courses</Link>
        <NewCourseModal />
        <div class="topbar-divider d-none d-sm-block" />
        <UncontrolledDropdown
          nav
          inNavbar
          style={{ listStyle: "none" }}
          to="/profil"
          className="nav-link text-reset"
        >
          <DropdownToggle nav caret>
            {this.props.auth.user ? `${this.props.auth.user.name}` : "Welcome"}
          </DropdownToggle>
          <DropdownMenu right>
            <NewCourseModal />
            <Link to="profil">
              <DropdownItem>
                {this.props.auth.user ? this.props.auth.user.name : "Profil"}
              </DropdownItem>
            </Link>
            {!this.props.auth.user ? (
              ""
            ) : this.props.auth.user.role === "admin" ? (
              <DropdownItem>
                <Link to="/administration" className="text-reset">
                  Users administration
                </Link>
              </DropdownItem>
            ) : null}

            <DropdownItem>
              <Link className="text-reset" to="/mycourses">
                My courses
              </Link>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem style={{ padding: "0.25em 0.5em" }}>
              <Logout />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    );
    const guestNav = (
      <>
        <ModalLogin />
        <ModalSignup />
      </>
    );
    return (
      <div>
        <div>
          <Navbar className="navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button
              id="sidebarToggleTop"
              class="btn btn-link d-md-none rounded-circle mr-3"
            >
              <i class="fa fa-bars"></i>
            </button>

            <Form className="inline" onSubmit={this.reasurchValidation}>
              <SearchModal />
            </Form>

            {/* <NavbarBrand href="#">GoMyCourse</NavbarBrand> */}
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem className="mr-2"></NavItem>
              </Nav>
              {this.props.auth.isAuthenticated ? logedNav : guestNav}
            </Collapse>
          </Navbar>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(HomeNavBar);
