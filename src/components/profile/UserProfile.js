import React, {  useState , useEffect } from 'react';
import Navbar from '../navbar/Navbar';
import UploadBook from './UploadBook';
import DeleteBook from './DeleteBook'
import {Link,Route} from 'react-router-dom'
import Profile from './Profile'
import EditUser from './EditUser';
import LikedSaved from './LikedSaved';
import ProfileHome from './ProfileHome';
import { getUserData } from './profileController'
// import Navbar from '../navbar/Navbar'
export default function UserProfile() {

    const [user , setUser ] = useState(false);
    useEffect(() => {

        //fetch id from backend...
            getUserData('me' , null , null)
            .then(res => {
                setUser(res.data.data) ;     
            })
            .catch(err => {
                console.log(`Error : unable to load user data : ${err}`)
            }) 
              
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

        
    
        if(user)
        {
            return (
                <div>
                    <Navbar viewType='profile' />
                    <Profile style={{width : "15%"}} user = {user} ></Profile>
                    <div style={{ marginLeft: "15%"}}>
                    <Route path = '/profile/home' component ={ProfileHome}> <ProfileHome user = {user}></ProfileHome> </Route>
                    <Route path = '/profile/addbooks' component ={UploadBook}></Route>
                    <Route path = "/profile/deletebooks" component = {DeleteBook}></Route>

                    <Route path='/profile/edit' > <EditUser user = {user}></EditUser> </Route>
                    <Route path='/profile/liked' ><LikedSaved type = {'liked'}/> </Route>
                    <Route path='/profile/saved' ><LikedSaved type= {'saved'}/> </Route>
                    </div>
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
