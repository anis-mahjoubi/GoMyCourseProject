import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteUserComments } from "../../js/actions/commentsActions";
import { deleteUserCourse } from "../../js/actions/coursesActions";
import { deleteUser } from "../../js/actions/usersActions";
import { logout } from "../../js/actions/authActions";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Form,
  Alert,
} from "reactstrap";

class DeleteUser extends Component {
  state = {
    isModalOpen: false,
    deleteComment: false,
    deleteCourses: false,
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
      deleteComment: false,
      deleteCourses: false,
    });
    this.toggle();
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };

  deleteHandler = () => {
    if (this.state.deleteComment)
      this.props.deleteUserComments(this.props.userID);
    if (this.state.deleteCourses)
      this.props.deleteUserCourse(this.props.userID);
    this.props.deleteUser(this.props.userID);
    this.close();
    this.props.logout();
  };

  render() {
    return (
      <div>
        <Button color="danger" className="mx-2" onClick={this.toggle}>
          {this.props.admin ? "Delete" : "Delete my account"}
        </Button>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggle}
          className="DeleteUserModal"
        >
          <ModalHeader toggle={this.toggle}>Delete user's account</ModalHeader>
          <ModalBody>
            {this.props.error.msg ? (
              <Alert color="primary">{this.props.error.msg}</Alert>
            ) : null}

            <Form>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="deleteComments"
                    onChange={this.handleChange}
                    name="deleteComment"
                  />{" "}
                  Delete all {this.props.admin ? null : "your"} comments
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    id="deleteCourses"
                    onChange={this.handleChange}
                    name="deleteCourses"
                  />{" "}
                  Delete all {this.props.admin ? null : "your"} courses
                </Label>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.deleteHandler}>
              {this.props.admin ? "Delete" : "Delete my account"}
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
const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, {
  deleteUserComments,
  deleteUserCourse,
  deleteUser,
  logout,
})(DeleteUser);
