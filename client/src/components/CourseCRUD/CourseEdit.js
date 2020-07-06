import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getCourses} from '../../js/actions/coursesActions'
//import CourseEditHeader from './CourseEditHeader'
import CourseEditHeader from './CourseEditHeader'
import { Redirect } from 'react-router-dom'
import EditCourseFooter from './EditCourseFooter'
import { Container } from 'reactstrap'

class CourseEdit extends Component {
    state = {
        courseID : null,
        course : null
    }
    async componentDidMount(){
        await this.props.getCourses()
        this.setState({
            ...this.state,
            courseID: this.props.match.params.id
        })
    }
    componentDidUpdate(){
        let actualCourse = this.props.courses.courses.find(course => {
            return course._id === this.state.courseID
        })
        if (actualCourse && !this.state.course) this.setState({
            course: actualCourse
        })
    }

    render() {
        if (!this.props.auth.isAuthenticated) return <Redirect to='/notfound' />
        if(!this.props.courses.courses) return <h1>Loading Data</h1>
        if(!this.state.course) return <h1>Waiting for magic to happen</h1>
        if (this.props.auth.user._id !== this.state.course.id_author && !this.props.auth.user.role==="admin")
            return <h1>Your cannot edit this course</h1>;

        else
        return (
            <Container>
                <h1>Update {this.state.course.name}</h1>
                <CourseEditHeader course={this.state.course} />
                <EditCourseFooter courseID={this.state.courseID}/>
            </Container>
        )
    }
}

const mapStateToProps = store =>({
    courses : store.courses,
    auth : store.auth
})

export default connect(mapStateToProps, { getCourses})(CourseEdit)
