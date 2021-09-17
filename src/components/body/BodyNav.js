import React, { Component } from 'react'
import {Link } from 'react-router-dom';
export default class BodyNav extends Component {
    render() {
        return (
            <div className = 'container-fluid mt-4 '>
                <Link to = '/home/' className = 'mr-5 ml-4 h5' >Overview</Link>
                <Link to = '/home/categories' className = 'mr-5 h5'>Categories</Link>
                <Link to = '/home/authors' className = 'mr-5 h5'>Authors</Link>
                <Link to = '/home/type' className = 'mr-5 h5'>Book Type</Link>
                <Link to = '/home/name' className = 'mr-5 h5'>Book Name</Link>
            </div>
        )
    }
}
