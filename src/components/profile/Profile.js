import React, { Component } from 'react'
import {Link,Switch,Route} from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import {BiUpload } from 'react-icons/bi'
import {BiArrowBack as BackIcon} from 'react-icons/bi'
import {RiDeleteBinLine} from 'react-icons/ri'
export default class Profile extends Component {
    render() {
        return (
            <div className="flex container-fluid">
                 <nav className="navbar  navbar-light"
                        style= {{height : '60px',backgroundColor:'#f0f8ff'}}>
                {/* <Navbar></Navbar> */}
                <Link to ='/home' className="nav-link navbar-brand"><BackIcon size={25}/></Link>
                <Link to ='/profile/home' className="nav-link navbar-brand">Home</Link>
                <Link to="/profile/liked" className="nav-link navbar-brand">Liked Books</Link>
                <Link to="/profile/saved" className="nav-link navbar-brand">Saved Books</Link>
                <Link to="/profile/edit" className="nav-link navbar-brand">Edit Details</Link>
                <Link to ='/profile/addbooks' className="nav-link navbar-brand"><BiUpload size={25}/></Link>
                <Link to ='/profile/deletebooks' className="nav-link navbar-brand "><RiDeleteBinLine size={25}/></Link>
                </nav>

                
            </div>
        )
    }
}
