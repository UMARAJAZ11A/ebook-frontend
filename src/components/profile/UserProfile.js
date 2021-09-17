import React, { Component } from 'react';
import Navbar from '../navbar/Navbar';
import UploadBook from './UploadBook';
import DeleteBook from './DeleteBook'
import {Link,Switch,Route} from 'react-router-dom'
import Profile from './Profile'
import EditUser from './EditUser';
import LikedSaved from './LikedSaved';
import ProfileHome from './ProfileHome';
// import Navbar from '../navbar/Navbar'
export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.onClickLogout = this.onClickLogout.bind(this);
        this.state = {
             islogin : true
        }
    }
    onClickLogout(){
        this.setState({
            islogin : false
       });
    }
    componentDidMount(){
        // if(this.props.location.state!=null)
        // {
        //     if(this.props.location.state.islogin ===true)
        //     this.setState({
        //         islogin : true
        //    });
        //    else
        //    {
        //         this.setState({
        //             islogin : false
        //     });
        //    }
        // }
        // else
        // {
        //     this.setState({
        //         islogin : false
        //    });
        // }
    }
    render() {
        if(this.state.islogin)
        {
            return (
                <div>
                    {/* <Navbar></Navbar> */}
                    <Profile></Profile>
                    <Route path = '/profile/home' component ={ProfileHome}></Route>
                    <Route path = '/profile/addbooks' component ={UploadBook}></Route>
                    <Route path = "/profile/deletebooks" component = {DeleteBook}></Route>
                    {/* <button onClick ={this.onClickLogout} className ="btn btn-primary m-3">Logout</button> */}
                    {/* <Link to = '/home/' className = 'm-4 h5'>overview</Link> */}
                    {/* <UploadBook></UploadBook> */}
                    <Route path='/profile/edit' component ={EditUser}></Route>
                    <Route path='/profile/liked' ><LikedSaved type = {'liked'}/> </Route>
                    <Route path='/profile/saved' ><LikedSaved type= {'saved'}/> </Route>
                </div>
            )
        }
        else
        {
            return (
                <div>
                    login to get the access

                    <Link to = '/login' className="btn btn-primary m-2">Login</Link>
                </div>
            )
        }
    }
}
