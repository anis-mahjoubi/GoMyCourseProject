import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Container,
  Row,
} from "reactstrap";
import moduleName from "../Courses/CourseCard";
import CourseCard from "../Courses/CourseCard";

class SearchModal extends Component {
  state = {
    words: "",
    isOpen: false,
  };

  componentDidUpdate() {
    if (this.state.words && !this.state.isOpen)
      this.setState({
        ...this.state,
        isOpen: true,
      });
  }

  toggle = () => {
    this.setState({
      ...this.state,
      words: "",
      isOpen: !this.state.isOpen,
    });
  };

  handleChange = (e) => {
    e.preventDefault();
    this.setState(
      {
        ...this.state,
        words: e.target.value,
        result: [],
      },
      this.checkCourse
    );
  };

  checkCourse = () => {
    if (this.props.courses && this.state.words) {
      let wordList = this.state.words.split(" ");
      let result = this.props.courses.filter((course) =>
          wordList.filter((word) => course.name.toLowerCase().indexOf(word.toLowerCase()) !== -1).length > 0
          ? course
          : null
      );

      this.setState({
        ...this.state,
        result: result,
        resultLength: result.length,
      });
    }
  };

  render() {
    return (
      <div class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
        <div class="input-group">
          <Input
            type="text"
            className="form-control bg-light border-1 small"
            placeholder="Search for..."
            aria-label="Search"
            aria-describedby="basic-addon2"
            onChange={this.handleChange}
            value={this.state.words}
          />
        </div>
        <Modal
          isOpen={this.state.isOpen}
          toggle={this.toggle}
          className="SignupModal modal-lg"
        >
          <ModalHeader toggle={this.toggle} className="d-flex">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0 small"
                placeholder="Search for..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                onChange={this.handleChange}
                value={this.state.words}
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
            {/* <Input
              type="search"
              placeholder="Search courses"
              aria-label="Search"
              style={{ width: "100%" }}
            /> */}
          </ModalHeader>
          <ModalBody>
            {this.state.resultLength} result(s) found for {this.state.words}
            <Row>
              {this.state.result
                ? this.state.result.map((course) => (
                    <CourseCard course={course} key={course._id} />
                  ))
                : null}
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  courses: state.courses.courses,
});

export default connect(mapStateToProps, null)(SearchModal);
