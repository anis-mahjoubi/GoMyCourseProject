import { Button, Form, Label, Input, FormGroup, Alert, Col } from "reactstrap";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addVideo, updateVideo, deleteVideo } from "../../js/actions/videosActions";

export class EditVideoCard extends Component {
  state = {
    deleted: false,
    video: {
      name: "",
      description: "",
      link: "",
      order: "",
      id_cour: this.props.courseID,
    },
  };

  componentDidMount() {
    this.setState({
      video: this.props.video,
      oldVideo: this.props.video,
    });
  }

  save = () => {
    console.log("send data via Axios : " + JSON.stringify(this.state.video));
    this.state.video._id
      ? this.props.updateVideo(this.state.video)
      : this.props.addVideo(this.state.video);

    this.setState({
      ...this.state,
      oldVideo: this.state.video,
    });
  };

  handleChange = (e) => {
    this.setState({
      video: {
        ...this.state.video,
        [e.target.name]: e.target.value,
      },
    });
  };

  delete=()=>{
  this.props.deleteVideo(this.state.video._id)
  if(!this.props.error.msg)
    this.setState({
      ...this.state,
      deleted:true
    })
  }

  render() {
    if (!this.state.video) return <h1>Wait for magic to happen</h1>;
    if (this.state.deleted) return null
    return (
      <Col
        xs="12"
        sm="6"
        md="4"
        className={`videoCard ${this.state.video._id} my-1` }
      >
        <Form>
          {this.props.error.msg ? (
            <Alert color="primary">{this.props.error.msg}</Alert>
          ) : null}
          <FormGroup>
            <Label for="name">Title</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Title"
              value={this.state.video.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              placeholder="Description"
              value={this.state.video.description}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="link">ID of Youtube Video</Label>
            <Input
              type="text"
              name="link"
              id="link"
              placeholder="ID should look like : 5yTazHkDR4o"
              value={this.state.video.link}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="order">Order</Label>
            <Input
              type="text"
              name="order"
              id="order"
              placeholder="Order"
              value={this.state.video.order}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            onClick={this.save}
            color={
              this.state.video === this.state.oldVideo ? "primary" : "danger"
            }
          >
            Save
          </Button>
          {this.state.video._id ? <Button onClick={this.delete } color="danger" className="mx-2">Delete</Button> : null}
          
        </Form>
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { addVideo, updateVideo, deleteVideo })(
  EditVideoCard
);
