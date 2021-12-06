import React from 'react'
import {Link} from 'react-router-dom'
import {BiUpload } from 'react-icons/bi'
import {BiArrowBack as BackIcon} from 'react-icons/bi'
import {RiDeleteBinLine} from 'react-icons/ri'


const sidenav =  {
    height: "100%" , /* 100% Full-height */
    width: "0", /* 0 width - change this with JavaScript */
    position: "fixed", /* Stay in place */
    zIndex: "1", /* Stay on top */
    top: "0", /* Stay at the top */
    left: "0",
   backgroundColor: "#f0f8ff" , /* Black*/
   // overflowX: "hidden", /* Disable horizontal scroll */
    paddingTop: "50px", /* Place content 60px from the top */
    transition: "0.5s", /* 0.5 second transition effect to slide in the sidenav */
    paddingRight : "15%"
 }
const sidenavA = {
   padding: "8px 8px 8px 0px",
   textDecoration: "none",
   fontSize: "25px",
   color: "black",
   display: "block",
   transition: "0.3s",
   
   
 }



  export default function Profile(props) {


        const role = props.user.role ?props.user.role  : 'user' ;
        return (
            <div className="flex container-fluid">
                {/* <Navbar viewType='profile' /> */}
                 <nav className="navbar  navbar-light"
                        style= {sidenav}>
                
                <Link to ='/home' className="nav-link navbar-brand" style= {sidenavA}><BackIcon size={25}/></Link>
                <Link to ='/profile/home' className="nav-link navbar-brand" style= {sidenavA}>Home</Link>
                <Link to="/profile/liked" className="nav-link navbar-brand" style= {sidenavA}>Liked Books</Link>
                <Link to="/profile/saved" className="nav-link navbar-brand" style= {sidenavA}>Saved Books</Link>
                <Link to="/profile/edit" className="nav-link navbar-brand" style= {sidenavA}>Edit Details</Link>

                { role === 'admin' ?   
                    <span >
                        <Link to ='/profile/addbooks' className="nav-link navbar-brand" style= {sidenavA}><BiUpload size={25}/></Link>
                        <Link to ='/profile/deletebooks' className="nav-link navbar-brand " style= {sidenavA}><RiDeleteBinLine size={25}/></Link>
                    </span>
                    :
                    <span></span>
                }
                </nav>

                            
            </div>
        )





    
}
