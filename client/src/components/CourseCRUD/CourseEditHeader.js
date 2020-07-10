import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Label, Input, FormGroup, Alert } from "reactstrap";
import { updateCourse, deleteCourse } from "../../js/actions/coursesActions";
import { Redirect } from "react-router-dom";

class CourseEditHeader extends Component {
  state = {
    course: {},
    deleted: false,
  };

  componentDidMount() {
    this.setState({
      course: this.props.course,
      oldCourse: this.props.course,
    });
  }

  save = () => {
    console.log("send data via Axios : " + JSON.stringify(this.state.course));
    this.props.updateCourse(this.state.course);
  };

  handleChange = (e) => {
    this.setState({
      course: {
        ...this.state.course,
        [e.target.name]: e.target.value,
      },
    });
  };

  delete = () => {
    this.props.deleteCourse(this.state.course._id);
    if (!this.props.error.msg)
      this.setState({
        deleted: true,
      });
  };

  render() {
    if (!this.state.course || !this.props.auth.user)
      return <h1>Please wait for magic to happen or refrech</h1>;
    if (this.state.deleted) return <Redirect to="/courses" />;
     return (
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
            value={this.state.course.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category</Label>
          <Input
            type="text"
            name="category"
            id="category"
            placeholder="Category"
            value={this.state.course.category}
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
            value={this.state.course.description}
            onChange={this.handleChange}
          />
        </FormGroup>
         <Button onClick={this.save} color="primary" id="saveCourse">
          Save
        </Button>
        <Button onClick={this.delete} color="danger" className="mx-2">
          Delete
        </Button>
      </Form>
    );
    //<Redirect to="/courses" />;
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateCourse, deleteCourse })(
  CourseEditHeader
);
