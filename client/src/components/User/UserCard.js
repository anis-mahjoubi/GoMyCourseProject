import React, { Component } from "react";
import {
  Button,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
  CardHeader,
  CardBody,
  Container,
} from "reactstrap";
import { updateUser, deleteUser } from "../../js/actions/usersActions";
import { logout } from "../../js/actions/authActions";
import { connect } from "react-redux";
import DeleteUser from './DeleteUser'

class UserCard extends Component {
  state = {
    deleted: false,
  };

  componentDidMount() {
    this.setState({
      user: this.props.user,
      oldUser: this.props.user,
      admin: this.props.user.role === "admin" ? true : false,
      contributer: this.props.user.role === "user" ? true : false,
    });
  }

  componentDidUpdate() {
    if (this.state.deleted && !this.props.admin) this.props.logout();
  }

  save = () => {
    console.log("send data via Axios : " + JSON.stringify(this.state.user));
    this.props.updateUser(this.state.user);

    this.setState({
      ...this.state,
      oldUser: this.state.user,
    });
  };

  handleChange = (e) => {
    this.setState({
      user: {
        ...this.state.user,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleRole = (e) => {
    if (e.target.name === "admin" && e.target.value) {
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          role: "admin",
        },
      });
    }

    if (e.target.name === "user" && e.target.value) {
      this.setState({
        ...this.state,
        user: {
          ...this.state.user,
          role: "user",
        },
      });
    }
  };

  delete = () => {
    this.props.deleteUser(this.state.user._id);
    this.setState({
      ...this.state,
      deleted: true,
    });
  };
  render() {
    if (!this.state.user) return <div>Wait for magic</div>;
    if (this.state.deleted) return null;
    return (
      <div class="card shadow mb-4">
        <a
        href = {this.props.admin ?  ("#collapseCardExample" + this.state.user._id) : ""}
          href={"#collapseCardExample" + this.state.user._id}
          class="d-block card-header py-3"
          data-toggle="collapse"
          role="button"
          aria-expanded="true"
          aria-controls={"collapseCardExample" + this.state.user._id}
        >
          <h6 class="m-0 font-weight-bold text-primary">
            {this.props.admin ? this.state.user.name : "Update your profile"}
          </h6>
        </a>
        <div
          class={"collapse "+ (this.props.admin ? "" : "show")}
          id={"collapseCardExample" + this.state.user._id}
        >
          <CardBody>
            <Form>
              {this.props.error.msg ? (
                <Alert color="primary">{this.props.error.msg}</Alert>
              ) : null}
              <FormGroup style={{ marginBottom: "0" }}>
                <Label for="name">
                  Name : {this.props.admin ? this.state.user.name : null}
                </Label>
                {!this.props.admin ? (
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={this.state.user.name}
                    onChange={this.handleChange}
                  />
                ) : null}
              </FormGroup>
              <FormGroup style={{ marginBottom: "0" }}>
                <Label for="email">
                  Email : {this.props.admin ? this.state.user.email : null}
                </Label>
                {!this.props.admin ? (
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={this.state.user.email}
                    onChange={this.handleChange}
                  />
                ) : null}
              </FormGroup>

              {this.props.admin ? (
                <FormGroup tag="fieldset" style={{ marginBottom: "0" }}>
                  <Label>Role</Label>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="role"
                        value="user"
                        checked={this.state.user.role === "user"}
                        onChange={this.handleChange}
                      />
                      Contributer
                    </Label>
                  </FormGroup>

                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={this.state.user.role === "admin"}
                        onChange={this.handleChange}
                      />
                      Admin
                    </Label>
                  </FormGroup>
                </FormGroup>
              ) : (
                <FormGroup>
                  <Label for="email">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={this.state.user.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              )}
              
              {/* <Button onClick={this.delete} color="danger" className="mx-2">
                {this.props.admin ? "Delete" : "Delete my account"}
              </Button> */}

              <div className="d-inline-flex">
                <Button
                  onClick={this.save}
                  color={
                    this.state.user === this.state.oldUser ? "primary" : "danger"
                  }
                >
                  Save
              </Button>
                <DeleteUser userID={this.state.user._id} />

              </div>
            </Form>
          </CardBody>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  error: state.error,
});

export default connect(mapStateToProps, { updateUser, deleteUser, logout })(
  UserCard
);
