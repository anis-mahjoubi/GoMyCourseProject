import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/Presentation/Home";
import CoursesList from "./components/Courses/CoursesList";
import Course from "./components/Courses/Course";
import Video from "./components/videos/Video";
import Admin from "./components/admin/Admin";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./js/store";
import { loadUser } from "./js/actions/authActions";
import HomeNavBar from "./components/HomeNavBar";
import Dashboard from './components/Dashboard/Dashboard'
import SideBar from "./components/SideBar";
import NotLoged from "./components/auth/NotLoged";
import CourseEdit from "./components/CourseCRUD/CourseEdit";
import Profil from "./components/User/Profil";
import MyCourses from './components/User/MyCourses'
import Categories from './components/Courses/Categories'
import { connect } from "react-redux";
import { getCourses } from "./js/actions/coursesActions";
import { getUsers } from "./js/actions/usersActions";
import { getVideos } from "./js/actions/videosActions";
import { getComments } from "./js/actions/commentsActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getVideos();
    this.props.getCourses();
    this.props.getUsers();
    this.props.getComments();
  }

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
        {/* <getData/> */}
        <div id="wrapper">
          <SideBar />
          {/* <!-- Content Wrapper --> */}
          <div id="content-wrapper" class="d-flex flex-column">
            {/* <!-- Main Content --> */}
            <div id="content">
              <HomeNavBar />

              <div class="container-fluid">
                <nav>
                  <Switch>
                    <Route exact path="/">
                      <Home />
                    </Route>
                    <Route exact path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/courses">
                      <CoursesList />
                    </Route>
                    <Route path="/categories">
                      <Categories />
                    </Route>
                    <Route path="/profil">
                      <Profil />
                    </Route>
                    <Route path="/mycourses">
                      <MyCourses />
                    </Route>
                    <Route path="/notfound">
                      <NotLoged />
                    </Route>
                    <Route path="/administration">
                      <Admin />
                    </Route>
                    <Route
                      path="/course/:id"
                      render={(props) => <Course {...props} />}
                    />
                    <Route
                      path="/video/:id"
                      render={(props) => <Video {...props} />}
                    />
                    <Route
                      path="/editcourse/:id"
                      render={(props) => <CourseEdit {...props} />}
                    />
                  </Switch>
                </nav>
                <div>
                  {/* <!-- Scroll to Top Button--> */}
                  <a class="scroll-to-top rounded" href="#page-top">
                    <i class="fas fa-angle-up"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default connect(null, { getCourses, getUsers, getVideos, getComments })(App);
