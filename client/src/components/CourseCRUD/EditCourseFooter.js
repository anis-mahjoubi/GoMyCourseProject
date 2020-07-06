import React, { Component } from "react";
import { connect } from "react-redux";
import EditVideoCard from "./EditVideoCard";
import { Button, Row } from "reactstrap";

class EditCourseFooter extends Component {
  state = {
    videos: [],
  };

  componentDidMount() {
    let videos = this.props.videos.videos.filter(
      (video) => video.id_cour === this.props.courseID
    );
    console.log(videos);
    this.setState({
      ...this.state,
      videos: videos,
    });
  }

  addVideo = () => {
    this.setState({
      ...this.state,
      videos: [
        ...this.state.videos,
        {
          name: "",
          description: "",
          link: "",
          order: "",
          id_cour: this.props.courseID,
        },
      ],
    });
  };

  render() {
    return (
      <div className="my-3">
        <Button onClick={this.addVideo}>Add new video</Button>
        <Row>
          {this.state.videos.map((video) => (
            <EditVideoCard video={video} key={video._id} />
          ))}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videos: state.videos,
});

export default connect(mapStateToProps, null)(EditCourseFooter);
