import React, { Component } from 'react'
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  Col,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteCourse } from "../../js/actions/coursesActions";

class CourseCard extends Component {
  state = {
    deleted : false
  }

  deleteCourse = () => {
    this.props.deleteCourse(this.props.course._id);
    if (!this.props.error.msg)
      this.setState({
        deleted: true,
      });
  }

  render() {
    if (!this.props.course._id) return <h1>waiting</h1>;
    return (
      <Col className="col-4 mb-3">
        <Card sm="3">
          <Link
            to={`/course/${this.props.course._id}`}
            style={{ color: "white" }}
          >
            <CardHeader className="py-3">
              <CardTitle className="m-0 font-weight-bold text-primary">
                {this.props.course.name}
              </CardTitle>
              <CardSubtitle className="m-0 font-weight-light text-secondary">
                By {this.props.course.id_author}
              </CardSubtitle>
            </CardHeader>
          </Link>
          <CardBody>
            <CardSubtitle>{this.props.course.category}</CardSubtitle>
            {/*add search for author name */}
            <CardText>{this.props.course.description}</CardText>
            <Link
              to={`/course/${this.props.course._id}`}
              style={{ color: "white" }}
            >
              <Button color="primary" className="m-1">
                Begin
              </Button>
            </Link>
            {/* Edit button */}
            {this.props.auth.user ? (
              this.props.auth.user._id === this.props.course.id_author ? (
                <Link to={`/editcourse/${this.props.course._id}`}>
                  <Button color="success" className="m-1">
                    Edit
                  </Button>
                </Link>
              ) : null
            ) : null}
            {/* Delete Button */}
            {this.props.auth.user ? (
              this.props.auth.user._id === this.props.course.id_author ||
              this.props.auth.user.role === "admin" ? (
                <Button
                  className="m-1"
                  color="danger"
                  onClick={this.deleteCourse}
                >
                  Delete
                </Button>
              ) : null
            ) : null}
          </CardBody>
        </Card>
      </Col>
    );
    
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  error : state.error
});

export default connect(mapStateToProps, { deleteCourse })(CourseCard)
