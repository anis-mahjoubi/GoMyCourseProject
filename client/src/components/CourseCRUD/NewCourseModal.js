import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Label,
  Input,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Alert,
} from "reactstrap";
import { addCourse,clearEditCourse } from "../../js/actions/coursesActions";

class NewCourseModal extends Component {
  state = {
    isModalOpen: false,
    newCourse: {},
  };

  toggle = () => {
    this.setState({
      ...this.state,
      isModalOpen: !this.state.isModalOpen,
    });
  };

  close = () => {
    this.setState({
      ...this.state,
      newCourse: {},
    });
    this.toggle();
  };

  save = () => {
    const newCourse = {
      id_author: this.props.auth.user._id || this.props.auth.user.id ,
      name: this.state.newCourse.name,
      category: this.state.newCourse.category,
      description: this.state.newCourse.description,
    };
    console.log("send data via Axios : " + JSON.stringify(newCourse));
    this.props.addCourse(newCourse);
  };

  handleChange = (e) => {
    this.setState({
      newCourse: {
        ...this.state.newCourse,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    if (!this.props.auth.isAuthenticated) return <Redirect to="/notfound" />;

    if (this.props.courses.createdCourse) {
      let createdCourse = this.props.courses.createdCourse
      this.props.clearEditCourse()
      this.close()
      return <Redirect to={`/editcourse/${createdCourse}`} />;
    }
      return (
        <div style={{ padding: "0.25em 0.5em" }}>
          <Button color="primary" onClick={this.toggle} style={{ lineHeight:"90%"}} className="py-3">
            Create course
          </Button>
          <Modal
            isOpen={this.state.isModalOpen}
            toggle={this.toggle}
            className="SignupModal"
          >
            <ModalHeader toggle={this.toggle}>Add new course</ModalHeader>
            <ModalBody>
              {this.props.error.msg ? (
                <Alert color="primary">{this.props.error.msg}</Alert>
              ) : null}
              <Form>
                <FormGroup>
                  <Label for="name">Title</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Title"
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
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.save}>
                Create
              </Button>
              <Button color="secondary" onClick={this.close}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
  }
}
const mapStateToProps = (store) => ({
  auth: store.auth,
  error: store.error,
  courses: store.courses,
});

export default connect(mapStateToProps, { addCourse, clearEditCourse })(NewCourseModal);
