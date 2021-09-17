import axios from 'axios';
import React, { Component } from 'react'
import { Link ,Redirect } from 'react-router-dom';





export default class Login extends Component {
    constructor(props) {
        super(props)
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.state = {
             email : '',
             password : '',
             errors: {
                email: '',
                
              },
            islogin :false,
            
        }
        // localStorage.setItem('islogin', true); 
       
    }
    onChangeEmail(e){
        const validEmailRegex = 
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if(!validEmailRegex.test(e.target.value))
        this.setState({
            email : e.target.value,
            errors : {email:'invalid Email Format [ abc@xyz.com ]'}
        })
        else
        {
            this.setState({
                email : e.target.value,
                errors : {email:''}
            })
        }
    }
    onChangePassword(e){
        this.setState({
            password : e.target.value,
        })
    }
    onSubmitHandler(e){
        e.preventDefault();

        const user =  {
            email       : this.state.email,
            password    : this.state.password
        };

        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/login/`, {params :{email: this.state.email,password    : this.state.password}})
        .then(res => {

            localStorage.setItem('islogin', true);
           
            localStorage.setItem('id', res.data[0].id);

            this.setState({
                islogin : true
            })
            

        })
        .catch(err =>{
            console.log(err) ;
            alert('User Not Found')
        });


    }
    render() {
            return (
                <div style = {{height: '100vh',paddingTop:'100px',backgroundColor:'#e5f4fe'}}>
                    
                    <div className ="container-fluid p-0 w-50 border border-primary rounded bg-light" >
                    <div className = "w-75 m-auto mt-sm-5 mb-sm-5">
                        <form onSubmit = {this.onSubmitHandler}>
                            <div className="form-group">
                                <label >Email address</label>
                                <input type="email" className="form-control" 
                                        aria-describedby="emailHelp" 
                                        placeholder="Enter email"
                                        required
                                        value = {this.state.email}
                                        onChange = {this.onChangeEmail}>
                                </input>
                                <small className ="text-danger">{this.state.errors.email}</small>
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input  type="password" className="form-control" 
                                        placeholder="Password"
                                        required
                                        value = {this.state.password}
                                        onChange = {this.onChangePassword}>
                                </input>
                                
                            </div>
                        
                        <button type="submit" className="btn btn-primary mt-2">Submit</button>
                        <Link  className ="p-3" to ="/create">Create an account</Link>
                        </form>
                    </div>
                    {   
                        this.state.islogin ? 
                            
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
}
