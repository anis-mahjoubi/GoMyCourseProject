import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

export const NotLoged = (props) => {
    if (props.auth.isAuthenticated) return <Redirect to='/' />
    return (
        <h1>
            Please login to access
        </h1>
    )
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps, null)(NotLoged)
