import React, { Component } from "react";
import VideoHeader from "./VideoHeader";
import VideoComments from "./VideoComments";
import { connect } from "react-redux";
import { getCourses } from "../../js/actions/coursesActions";
import { getUsers } from "../../js/actions/usersActions";
import { getVideos } from "../../js/actions/videosActions";
import { Redirect } from "react-router-dom";
import { Row } from "reactstrap";

class Video extends Component {
  state = {
    video: {
      name: "Old Video",
      link: "",
    },
    author: {
      name: "Old authors",
    },
    course: {
      name: "Old course",
    },
  };

  componentDidMount() {
    this.setState(
      {
        ...this.state,
        video: this.props.videos.videos.find(
          (video) => video._id === this.props.match.params.id
        ),
      },
      this.checkCourse
    );
  }

  checkCourse = () => {
    if (this.state.video._id && this.props.courses) {
      let course = this.props.courses.courses.find(
        (course) => course._id === this.state.video.id_cour
      );
      if (course)
        this.setState(
          {
            ...this.state,
            course: course,
          },
          this.checkAuthor
        );
    }
  };

  checkAuthor = () => {
    if (this.state.course.name && this.props.users) {
      let author = this.props.users.users.find(
        (user) => user._id === this.state.course.id_author
      );
      if (author)
        this.setState({
          ...this.state,
          author: author,
        });
    }
  };

  render() {
    if (!this.props.auth.isAuthenticated) return <Redirect to="/notfound" />;
    if (!this.state.video._id || !this.state.author) return <h1>Loading data</h1>;
    return (
      <Row>
        <VideoHeader video={this.state.video} author={this.state.author} />
        <VideoComments currentVideo={this.state.video} />
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  videos: state.videos,
  courses: state.courses,
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, { getVideos, getCourses, getUsers })(
  Video
);
