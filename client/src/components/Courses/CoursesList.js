import React, { Component } from "react";
import { Row } from "reactstrap";
import CourseCard from "./CourseCard";
import { connect } from "react-redux";
import { getCourses } from "../../js/actions/coursesActions";

class CoursesList extends Component {
  componentDidMount() {
    this.props.getCourses();
  }

  // this.props.category ?

  render() {
    return (
      <div>
        <div className="mx-3">
          <h1>{this.props.myCourses ? "My " : null}Courses</h1>
          {this.props.myCourses ? (
            <Row>
              {this.props.courses.courses
                .filter((course) => course.id_author === this.props.myCourses)
                .map((course) => (
                  <CourseCard course={course} key={course._id} />
                ))}
            </Row>
          ) : this.props.category ? (
            <Row>
              {this.props.courses.courses
                  .filter((course) => course.category.indexOf(this.props.category) !== -1)
                .map((course) => (
                  <CourseCard course={course} key={course._id} />
                ))}
            </Row>
          ) : (
            <Row>
              {this.props.courses.courses.map((course) => (
                <CourseCard course={course} key={course._id} />
              ))}
            </Row>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses,
});

export default connect(mapStateToProps, { getCourses })(CoursesList);
