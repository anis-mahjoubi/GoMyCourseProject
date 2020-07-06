import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { login } from "../../js/actions/authActions";
import { clearErrors } from "../../js/actions/errorActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class ModalLogin extends Component {
  state = {
    isModalOpen: false,
    email: "",
    password: "",
  };

  componentDidUpdate(prev) {
    if (this.state.isModalOpen && this.props.isAuthenticated)
    this.props.history.push(`/dashboard`);
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({
      ...this.state,
      isModalOpen: !this.state.isModalOpen,
    });
  };
  close = () => {
    this.setState({
      ...this.state,
      email: "",
      password: "",
    });
    this.toggle();
  };
  confirm = (event) => {
    event.preventDefault();
    this.props.login(this.state);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    if (this.props.isAuthenticated) return <Redirect to="/dashboard"/>
    return (
      <div>
        <Button color="link" onClick={this.toggle}>
          Login
        </Button>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggle}
          className="SignupModal"
        >
          <ModalHeader toggle={this.toggle}>Welcome to GoMyCourse</ModalHeader>
          <ModalBody>
            {this.props.error.id === "LOGIN_FAIL" ? (
              <Alert>{this.props.error.msg}</Alert>
            ) : null}
            <Form onSubmit={this.confirm}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Your password"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirm}>
              confirm
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
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(ModalLogin);
