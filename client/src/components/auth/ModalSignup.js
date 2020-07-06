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
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signup } from "../../js/actions/authActions";
import { clearErrors } from "../../js/actions/errorActions";

class ModalSignup extends Component {
  state = {
    isModalOpen: false,
    name: "",
    email: "",
    password: "",
    confirmationPassword: "",
    emailMsg: null,
    pwdMsg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevState) {
    if (this.state.isModalOpen && this.props.isAuthenticated) this.toggle();

    console.log(
      "email validation : " +
        this.validateEmail(this.state.email) +
        " for : '" +
        this.state.email +
        "'"
    );
    if (!this.state.emailMsg && this.state.email) {
      if (!this.validateEmail(this.state.email))
        this.setState({
          ...this.state,
          emailMsg: "Please verify email",
        });
    }
    if (
      (!this.state.email && this.state.emailMsg) ||
      (this.state.email &&
        this.state.emailMsg &&
        this.validateEmail(this.state.email))
    )
      this.setState({
        ...this.state,
        emailMsg: "",
      });

    if (!this.passwordValidation(this.state.password, this.state.confirmationPassword) && this.state.confirmationPassword && !this.state.pwdMsg)
      this.setState({
        ...this.state,
        pwdMsg: "Please verify password",
      });
    if (
      (!this.state.confirmationPassword && this.state.pwdMsg) ||
      (this.state.confirmationPassword &&
        this.state.pwdMsg &&
      this.passwordValidation(this.state.password, this.state.confirmationPassword))
    ) this.setState({
      ...this.state,
      pwdMsg: "",
    });
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+")) @(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+)+[a-zA-Z]{2,}))$/gim;
    //return re.test(String(email).toLowerCase());
    return true
  };

  passwordValidation = (password,confirmationPwd) =>{
    return password===confirmationPwd
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
      name: "",
      email: "",
      password: "",
      emailMsg: "",
      pwdMsg: "",
    });
    this.toggle();
  };
  save = () => {
    console.log("send data via Axios");
    //if(this.state.password && !this.state.pwdMsg && !this.state.emailMsg)
    this.props.signup(this.state);
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <Button color="primary" onClick={this.toggle}>
          Sign up
        </Button>
        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggle}
          className="SignupModal"
        >
          <ModalHeader toggle={this.toggle}>Welcome to GoMyCourse</ModalHeader>
          <ModalBody>
            {this.props.error.id === "REGISTER_FAIL" ? (
              <Alert>{this.props.error.msg}</Alert>
            ) : null}
            {this.state.emailMsg ? <Alert>{this.state.emailMsg}</Alert> : null}
            <Form>
              <FormGroup>
                <Label for="name">Full name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Your full name"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your email"
                  style={
                    this.state.emailMsg
                      ? { background: "#d9534f", color: "white" }
                      : null
                  }
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
              <FormGroup>
                <Label for="confirmationPassword">Confirm your password</Label>
                <Input
                  type="password"
                  name="confirmationPassword"
                  id="confirmationPassword"
                  placeholder="Confirm your password"
                  onChange={this.handleChange}
                  style={
                    this.state.pwdMsg
                      ? { background: "#d9534f", color: "white" }
                      : null
                  }
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.save}>
              Confirm
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

export default connect(mapStateToProps, { signup, clearErrors })(ModalSignup);
