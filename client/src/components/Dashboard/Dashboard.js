import React, { Component } from 'react'
import { connect } from 'react-redux'
import Charts from './Charts'

export class Dashboard extends Component {
    render() {
        return (
            <div>
                <Charts/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})


export default connect(mapStateToProps)(Dashboard)
