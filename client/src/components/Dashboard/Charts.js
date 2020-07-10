import React, { Component } from "react";
import { connect } from "react-redux";
import chartsArea from "../../img/charts-area.PNG";
import chartsBar from "../../img/charts-bar.PNG";
import chartsCercle from "../../img/charts-cercle.PNG";
import CoursesList from '../Courses/CoursesList'

export class Charts extends Component {
  state = {
    myCourses: false,
  };
  // checkContributer = () => {
  //   console.log("go gog og o");
  //   console.log("user" + this.props.auth.user);
  //   let courses = [];
  //   if (this.props.auth.user) {
  //     console.log("i have a user");
  //     if (this.props.courses) {
  //       console.log("i have courses");
  //       console.log("courses list : " + JSON.stringify(this.props.courses));
  //       courses = this.props.courses.courses.filter(
  //         (course) => course.id_author === this.props.auth.user._id
  //       );
  //       console.log("this is my courses " + JSON.stringify(courses));
  //     }
  //   }

  //   this.setState({
  //     ...this.state,
  //     myCourses: courses,
  //   });
  // };

  render() {
    console.log('this.props.auth', this.props.auth)
    // if (!this.state.myCourses && this.props.auth.user) this.checkContributer();
    // if (!this.state.myCourses) return <h1>Loading </h1>;
    // if (this.state.myCourses.length > 0)
      return (
        <div>
          <div className="container-fluid">
            <h1 className="h3 mb-2 text-gray-800">Charts</h1>
            <p className="mb-4">
              Here you can found charts about your activity and your followers
            </p>

            <div class="row">
              <div class="col-xl-8 col-lg-7">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                      Courses sold by moth
                    </h6>
                  </div>
                  <div class="card-body">
                    <div class="chart-area">
                      <img src={chartsArea} id="myAreaChart" />
                    </div>
                    <hr />
                    Here you can insight on courses sold every month
                  </div>
                </div>

                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                      Total sold by moth
                    </h6>
                  </div>
                  <div class="card-body">
                    <div class="chart-bar">
                      <img src={chartsBar} id="myBarChart" />
                    </div>
                    <hr />
                    Here you can insight on your sold every month
                  </div>
                </div>
              </div>

              <div class="col-xl-4 col-lg-5">
                <div class="card shadow mb-4">
                  <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">
                      Categories
                    </h6>
                  </div>
                  <div class="card-body">
                    <div class="chart-pie pt-4">
                      <img src={chartsCercle} id="myPieChart" />
                    </div>
                    <hr />
                    Here you can insight on courses sold every month by
                    categories
                  </div>
                </div>
              </div>
            </div>
          </div>
              <CoursesList myCourses={this.props.auth.user._id}/>
        </div>

      );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  courses: state.courses,
});

export default connect(mapStateToProps)(Charts);
