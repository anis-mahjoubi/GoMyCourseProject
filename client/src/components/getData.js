import { getCourses } from "../js/actions/coursesActions";
import { getUsers } from "../js/actions/usersActions";
import { getVideos } from "../js/actions/videosActions";
import React, { Component } from "react";
import { connect } from "react-redux";

export class getData extends Component {
  componentDidMount() {
    this.props.getVideos();
    this.props.getCourses();
    this.props.getUsers();
  }
  render() {
    return <div></div>;
  }
}

export default connect(null, { getCourses, getUsers, getVideos })(getData);
