import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Row,Col } from "reactstrap";
import UserCard from "../User/UserCard";


class Admin extends Component {
  render() {
    if (this.props.auth.isLoading) return <h1>Waiting for magic to happen</h1>;
    if (this.props.auth.isAuthenticated) {
      if (this.props.auth.user.role !== "admin") return <Redirect to="/" />;
    }
    // else return <Redirect to="/" />;
    if (!this.props.users) return <h1>Wait for magic to happen</h1>;
    if(!this.props.auth.isAuthenticated)  return <Redirect to="/" />;
    return (
      <Container>
        <h1>Users administration</h1>
        <Row>
          {this.props.users.users.map((user) => (
            <Col
              xs="12"
              sm="6"
              md="4"
              className={`userCard ${user._id} my-1`}
            >
              <UserCard user={user} key={user._id} admin={true}/>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

export default connect(mapStateToProps)(Admin);
