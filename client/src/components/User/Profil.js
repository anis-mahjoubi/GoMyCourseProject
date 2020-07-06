import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import {Container} from 'reactstrap'
import { Redirect } from 'react-router-dom'

class Profil extends Component {

    render() {
        if (!this.props.auth.isAuthenticated) return <Redirect to='/notfound' />
        if(!this.props.auth.user) return <h1>Please wait for magic to happen</h1>
        return (
            <Container>
                <h1>Welcome {this.props.auth.user.name}</h1>
                <p>Here you can update your profil</p>
                <UserCard user={this.props.auth.user} admin={false}/>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    auth : state.auth
})

export default connect(mapStateToProps)(Profil)
