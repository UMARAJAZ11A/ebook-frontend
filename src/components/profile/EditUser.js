import React,{useState} from 'react'
import axios from 'axios'


export default function EditUser(props) {
    
    const user = props.user;
    const [email,setEmail] = useState(null);
    const [firstName,setFirstName] = useState(null);
    const [lastName,setLastName] = useState(null);
    const [gender,setGender] = useState(null);
    const [dateOfBirth,setDateOfBirth] = useState(null);
    
    const editUserDetails = (e) => {
        // e.preventDefault();

        const User = {
            email : email?email:null ,
            firstName : firstName?firstName:null ,
            lastName : lastName?lastName:null
        }

        const token = localStorage.getItem('token')
        axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/me/update`,User ,{ headers: {"Authorization" : `token ${token}`} , withCredentials: true  })
        .then(res => {
             console.log(res.data)
            
        })  
        .catch(err => {

            console.log(`Error : unable to Update user data : ${err}`)
        })    

    }
    return (
        <div className='w-75 m-auto' style={{paddingTop : '100px'}}>

                    <form onSubmit={(e) => editUserDetails(e)}>
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <span className="h2">Email</span>
                                
                            </div>
                            <div class="col-md-4 mb-3">
                                
                                { email !=null? 
                                        <input type="text" class="form-control"  placeholder={user.email} 
                                                value={email}
                                                onChange = {(e) => setEmail(e.target.value)} />
                                        
                                        :
                                        <h2 className='text-info h-25 m-0'> {user.email}</h2>
                                    }
                            </div>
                            <div class="col-md-4 mb-3">
                                    <span className='btn btn-danger mr-1  ' onClick={() =>setEmail('')}>Edit</span>
                                    <span href='#' className='btn btn-secondary ' onClick={() =>setEmail(null)}>Cancle</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <span className="validationCustom01 h2">First Name</span>
                                
                            </div>
                            <div class="col-md-4 mb-3">
                                { firstName !=null? 
                                        <input 
                                            type="text" 
                                            className="form-control"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder={user.firstName}></input>
                                        :
                                        <h2 className='text-info h-25 m-0'> {user.firstName}</h2>
                                    }
                            </div>
                            <div class="col-md-4 mb-3">
                                    <span href='#' className='btn btn-danger mr-1 ' onClick={() =>setFirstName('')}>Edit</span>
                                    <span href='#' className='btn btn-secondary ' onClick={() =>setFirstName(null)}>Cancle</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <span className="validationCustom01 h2">Last Name</span>
                                
                            </div>
                            <div class="col-md-4 mb-3">
                                        { lastName !=null ? 
                                                <input 
                                                type="text" 
                                                className="form-control"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder={user.lastName}></input>
                                                :
                                                <h2 className='text-info h-25 m-0'> {user.lastName}</h2>
                                            }
                            </div>
                            <div class="col-md-4 mb-3">
                                    <span href='#' className='btn btn-danger mr-1 ' onClick={() =>setLastName('')}>Edit</span>
                                    <span href='#' className='btn btn-secondary' onClick={() =>setLastName(null)}>Cancle</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <span className="validationCustom01 h2">Gender</span>
                                
                            </div>
                            <div class="col-md-4 mb-3">
                                    { gender !=null? 
                                            <input 
                                            type="text" 
                                            className="form-control"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            placeholder={user.gender}></input>
                                            :
                                            <h2 className='text-info h-25 m-0'> {user.gender}</h2>
                                        }
                            </div>
                            <div class="col-md-4 mb-3">
                                    <span href='#' className='btn btn-danger mr-1 ' onClick={() =>setGender('')}>Edit</span>
                                    <span href='#' className='btn btn-secondary ' onClick={() =>setGender(null)}>Cancle</span>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-md-4 mb-3">
                                <span className="validationCustom01 h2">Date Of Birth</span>
                                
                            </div>
                            <div class="col-md-4 mb-3">
                                    { dateOfBirth !=null? 
                                            <input 
                                            type="date" 
                                            className="form-control"
                                            value={dateOfBirth}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                            placeholder={user.dateOfBirth}></input>
                                            :
                                            <h2 className='text-info h-25 m-0'> {user.dateOfBirth}</h2>
                                        } 
                            </div>
                            <div class="col-md-4 mb-3">
                                        <span href='#' className='btn btn-danger mr-1 ' onClick={() =>setDateOfBirth('')}>Edit</span>
                                        <span href='#' className='btn btn-secondary ' onClick={() =>setDateOfBirth(null)}>cancle</span>
                            </div>
                        </div>
                    <button class="btn btn-success mt-4" type="submit">Submit form</button>
                    </form>

                    {/* <button >Change Password</button> */}

        </div>
    )
}
