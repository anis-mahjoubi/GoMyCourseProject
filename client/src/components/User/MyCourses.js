import React, { Component } from 'react'
import { connect } from 'react-redux'
import CoursesList from '../Courses/CoursesList'

export class MyCourses extends Component {
    render() {
        
        if(!this.props.auth.user) return <h1>Waiting for magic to happen</h1>
        return (
            <CoursesList myCourses={this.props.auth.user._id} />
        )
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth
})


export default connect(mapStateToProps)(MyCourses)
