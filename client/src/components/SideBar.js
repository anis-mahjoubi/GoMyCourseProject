import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Link, withRouter  } from 'react-router-dom';


class SideBar extends Component {



    render() {
      if (!this.props.auth.isAuthenticated || this.props.location.pathname==="/") return null;

        return (
          <div>
            <div id="wrapper" style={{height:"100%"}}>
              {/* <!-- Sidebar --> */}
              <ul
                className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
                id="accordionSidebar"
              >
                {/* <!-- Sidebar - Brand --> */}
                <Link
                  className="sidebar-brand d-flex align-items-center justify-content-center"
                  to="/"
                >
                  <div className="sidebar-brand-icon">
                    <i class="fab fa-accusoft"></i>
                  </div>
                  <div className="sidebar-brand-text mx-3">GoMyCourses</div>
                </Link>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider my-0" />

                {/* <!-- Nav Item - Dashboard --> */}
                <li className="nav-item active">
                  <Link className="nav-link" to="/dashboard">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">Learn new things everyday</div>

                {/* <!-- Nav Item - Pages Collapse Menu --> */}
                <li className="nav-item">
                  <Link to="/courses" className="nav-link">
                    <i class="fas fa-video"></i>
                    <span>Courses</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    <i class="fas fa-th"></i>
                    <span>Categories</span>
                  </Link>
                </li>
                {/* <!-- Nav Item - Utilities Collapse Menu --> */}

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider" />

                {/* <!-- Heading --> */}
                <div className="sidebar-heading">Configuring</div>

                {/* <!-- Nav Item - Pages Collapse Menu --> */}

                {/* <!-- Nav Item - Charts --> */}

                <li className="nav-item ">
                  <Link className="nav-link " to="/profil">
                    <i class="fas fa-user-alt"></i>
                    <span>My profil</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link " to="/mycourses">
                    <i class="fas fa-podcast"></i>
                    <span>My courses</span>
                  </Link>
                </li>

                {/* <!-- Nav Item - Tables --> */}
                <li className="nav-item">
                  <Link className="nav-link" to="">
                    <i class="fas fa-sliders-h"></i>
                    <span>Settings</span>
                  </Link>
                </li>

                {/* <!-- Divider --> */}
                <hr className="sidebar-divider d-none d-md-block" />
              </ul>
            </div>
          </div>
        );
    }
}

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps)(withRouter(SideBar))