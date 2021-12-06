import axios from 'axios';
import React, {  useState } from 'react'
import { Link ,Redirect } from 'react-router-dom';
// import { useCookies } from "react-cookie";


// import {cookie,useCookies} from "react-cookie";
export default function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [emailError , setEmailError] = useState('');
    const[login , setLogin] = useState(false);
    // const [cookies, setCookie] = useCookies(["user"]);
    const onChangeEmail = (e) => {
        const validEmailRegex = 
        RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if(!validEmailRegex.test(e.target.value))
        {
            setEmail(e.target.value);
            setEmailError('invalid Email Format [ abc@xyz.com ]');
        }
        else
        {
            setEmail(e.target.value);
            setEmailError('');
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();


        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/login/`, { email: email, password    : password  } , {
            headers: {
                "Content-Type": "application/json"
            },
             withCredentials: true ,
        } )
        .then(res => {

            // let cookie = res.headers;
            console.log(`user is logged in successfully login status :` , res.data);

            localStorage.setItem('token', res.data.token);
            
            setLogin(true);
            
           
            // localStorage.setItem('id', res.data[0].id);

            // this.setState({
            //     islogin : true
            // })
            // window.location = '/home'
            
            // cookie.set(res.data)

        })
        .catch(err =>{
            console.log(err) ;
            alert('User Not Found')
        });
    }

    return (
        <div style = {{height: '100vh',paddingTop:'100px',backgroundColor:'#e5f4fe'}}>
            
            <div className ="container-fluid p-0 w-50 border border-primary rounded bg-light" >
            <div className = "w-75 m-auto mt-sm-5 mb-sm-5">
                <form onSubmit = {(e) => onSubmitHandler(e)}>
                    <div className="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" 
                                aria-describedby="emailHelp" 
                                placeholder="Enter email"
                                required
                                value = {email}
                                onChange = {(e) => onChangeEmail(e)}>
                        </input>
                        <small className ="text-danger">{emailError}</small>
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input  type="password" className="form-control" 
                                placeholder="Password"
                                required
                                value = {password}
                                onChange = {(e) => setPassword(e.target.value)}>
                        </input>
                        
                    </div>
                
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
                <Link  className ="p-3" to ="/create">Create an account</Link>
                </form>
            </div>
            {   
                login ? 
                    
                    <Redirect  to={{
                        pathname: '/home'
                    }}/>
                    : 
                    null
            }
        </div>
        </div>
    )
}


