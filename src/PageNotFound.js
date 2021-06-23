import { Link } from 'react-router-dom'
import React, { Component } from 'react'

export default class PageNotFound extends Component {
    render() {
        return (
            <div>
                <h1>404 Page Not Found!</h1>
                <Link to="/">
                    Click here to go Home
                </Link>
            </div>
        )
    }
}




