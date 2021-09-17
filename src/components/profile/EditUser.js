import React,{useEffect,useState} from 'react'
import axios from 'axios'

export default function EditUser() {
    
    const [user,setUser] = useState('');
    useEffect(() => {

        //fetch id from backend...
        const id = localStorage.getItem('id')
       
            axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/create/`,{ params: {
                id : id
              }} )
            .then(res => {
                // console.log(res.data[0])
                setUser(res.data[0])
            })  
            .catch(err => {
    
                console.log(`Error : unable to load user data : ${err}`)
            })    
              

    }, [])
    return (
        <div className='ml-3'>
           <h4>Here Edit User Details</h4>
           <h4>Name:::::{user.firstName}{' '}{user.lastName}</h4>
           <h4>Gender::::{user.gender}</h4>
           <h4>Date Of Birth::{user.dateOfBirth}</h4>

        </div>
    )
}
