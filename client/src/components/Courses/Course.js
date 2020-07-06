import React, { Component } from "react";
import VideoCardCourses from "./VideoCardCourses";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Course extends Component {
  state = {
    course: { name: "Welcome to your course" },
  };

  async componentDidMount() {
    this.setState(
      {
        ...this.state,
        course: this.props.courses.courses.find(
          (course) => course._id === this.props.match.params.id
        ),
      },
      this.checkAuthor
    );
  }

  checkAuthor = () => {
    if(this.state.course){
      if (this.state.course.id_author && this.props.users) {
        let author = this.props.users.users.find(
          (user) => user._id === this.state.course.id_author
        );
        this.setState({
          ...this.state,
          author: author,
        });
      }
    }
  };

  render() {
    if (!this.props.auth.isAuthenticated) return <h1>Please login to access</h1>;
    return (
      <div>
        <main className="mx-3">
          <h1>{this.state.course ? this.state.course.name : "Old Course"}</h1>
          <h6>
            {this.state.author
              ? "By : " + this.state.author.name
              : "Old authors"}
          </h6>
          <Row className="m-3">
            {this.props.videos.videos.map((video) =>
              video.id_cour === this.props.match.params.id ? (
                <VideoCardCourses
                  key={video._id}
                  video={video}
                  author={this.state.author}
                  course={this.state.course}
                  className="col-4 shadow mb-4"
                />
              ) : null
            )}
          </Row>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videos: state.videos,
  users: state.users,
  courses: state.courses,
  auth: state.auth,
});

export default connect(mapStateToProps)(Course);
