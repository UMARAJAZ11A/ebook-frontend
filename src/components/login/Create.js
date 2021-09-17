import React, { Component} from 'react'
import axios from 'axios';

export default class Create extends Component {
    constructor(props) {
        super(props)
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeDob = this.onChangeDob.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);

        this.state = {
             id : '' ,
             firstName : '' ,
             lastName  : '' ,
             dateOfBirth : new Date() ,
             gender : '',
             email  : '',
             password : '',
             errors : {
                firstName : '' ,
                lastName  : '' ,
                dateOfBirth : '' ,
                gender : '',
                email  : '',
                password : ''

             }
        }
    }
    componentDidMount(){
        
      
    }
    onChangeFirstName(e){
        const btn = document.querySelector('button');
        if(/\s/g.test(e.target.value)===false&&e.target.value.length>2)
        {
            btn.disabled = false;
            this.setState({
                firstName : e.target.value,
                errors : {firstName : ''}
            })
        }
        else
        {
            btn.disabled = true;
            this.setState({
                firstName : e.target.value,
                errors : {firstName : 'Invalid Name'}
            })
        }
    }
    onChangeLastName(e){
        const btn = document.querySelector('button');
        if(/\s/g.test(e.target.value)===false&&e.target.value.length>2)
        {
            btn.disabled = false;
            this.setState({
                lastName : e.target.value,
                errors : {lastName : ''}
            })
        }
        else
        {
            btn.disabled = true;
            this.setState({
                lastName : e.target.value,
                errors : {lastName : 'Invalid Name'}
            })
        }
    }
    onChangeDob(e){
        //console.log(e.target.value)
        const btn = document.querySelector('button');
        const validDob = new Date().getFullYear() ;
        // //console.log(validDob,e.target.value.substring(0,4));
        if(validDob - e.target.value.substring(0,4)>=12)
        {
            btn.disabled = false;
            this.setState({
                dateOfBirth:e.target.value,
                errors :{dateOfBirth : ''}
            })
        }
        else
        {
            btn.disabled = true;
            this.setState({
                errors : {dateOfBirth : 'min age 12 years'}
            })
        }
        
    }
    onChangeGender(e){

        if(document.getElementById(e.target.value).checked === true)
            {
                this.setState({
                gender : e.target.value,
                errors : {gender : ''}
                })
            }
        else
        {
            this.setState({
                gender : '',
                errors : {gender: 'Choose one!'}
            })
        }
        if(e.target.value === 'male')
        {
            document.getElementById('female').checked = false;
            
            document.getElementById('others').checked = false;
        }
        else if(e.target.value === 'female')
        {
            document.getElementById('male').checked = false;
                
            document.getElementById('others').checked = false;

        }
        else{

                document.getElementById('female').checked = false;
                
                document.getElementById('male').checked = false;

        }

    }
    onChangeEmail(e){
        const btn = document.querySelector('button');
        const validEmailRegex = 
        RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        if(!validEmailRegex.test(e.target.value))
        {       this.setState({
                    email : e.target.value,
                    errors : {email:'invalid Email Format [ abc@xyz.com ]'}
                })
                btn.disabled = true;
        }
        else
        {
            this.setState({
                email : e.target.value,
                errors : {email:''}
            })
            btn.disabled = false;
        }
    }
    onChangePassword(e){
        const validPasswordRegex = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
        const btn = document.querySelector('button');
        if(!validPasswordRegex.test(e.target.value))
        {       this.setState({
                    password : e.target.value,
                    errors : {password:'min 8 char,1 uppercase,1 lowercase, 1 number and 1 special character:'}
                })
                btn.disabled = true;
        }
        else
        {
            this.setState({
                password : e.target.value,
                errors : {password:''}
            })
            btn.disabled = false;
        }
        this.setState({
            password : e.target.value
        })
    }
    onSubmitHandler(e){
        e.preventDefault();

        let idGenerated = parseInt(Date.now() 
                            + Math.random() 
                            + this.state.firstName 
                            + this.state.email);
        // //console.log(idGenerated,'this is id gen');
        this.setState({
            id : idGenerated
        }, () => {

                const user = {
                    id          :this.state.id ,
                    firstName   : this.state.firstName,
                    lastName    : this.state.lastName,
                    dateOfBirth :this.state.dateOfBirth,
                    gender      : this.state.gender,
                    email       : this.state.email,
                    password    : this.state.password,
                }
                //console.log(user);
                axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/create/`,user)
                .then(res => {
                    console.log(`User Profile Created Successfully! : ${res}`);
        
                })
                .catch(err => {
                    console.log(`Error : Can't Create User Profile : ${err}`);
                });
        })

    }
    render() {
        return (
            <div style = {{height: '100vh',paddingTop:'20px',backgroundColor:'#e5f4fe'}}>
                <div className ="container-fluid p-0 w-50 mb-5 border border-primary rounded bg-light" >
                    <div className = "w-75 m-auto mt-sm-4 mb-sm-2">
                        <form onSubmit = {this.onSubmitHandler}>
                            <div className="form-group mb-1">
                                <label > First Name</label>
                                <input type="text" className="form-control " 
                                        aria-describedby="emailHelp" 
                                        required
                                        value = {this.state.firstName}
                                        onChange = {this.onChangeFirstName}
                                        placeholder="First Name">
                                </input>
                                <small className ="text-danger">{this.state.errors.firstName}</small>
                            </div>

                            <div className="form-group mb-1">
                                <label > Last Name</label>
                                <input type="text" className="form-control" 
                                        aria-describedby="emailHelp" 
                                        required
                                        value = {this.state.lastName}
                                        onChange = {this.onChangeLastName}
                                        placeholder="Last Name">
                                </input>
                                <small className ="text-danger">{this.state.errors.lastName}</small>
                            </div>
                            <div className="form-group mb-1">
                                <label >Date of Birth</label>
                                <input type="date" className="form-control w-50" 
                                        aria-describedby="emailHelp"
                                        value ={this.state.dateOfBirth} 
                                        onChange={this.onChangeDob}>
                                </input>
                                <small className ="text-danger">{this.state.errors.dateOfBirth}</small>
                            </div>
                            <div className="form-check mt-4 mb-4">
                                
                                <input type="checkbox" className="form-check-input" 
                                        value ='male'
                                        id = "male"
                                        required = {this.state.gender === '' ? true:false}
                                        onChange = {this.onChangeGender}
                                        ></input>
                                <label className="form-check-label ml-0 mr-5">Male</label>
                                <input type="checkbox" className="form-check-input" 
                                        value ='female'
                                        id = "female"
                                        required ={this.state.gender === '' ? true:false}
                                        onChange = {this.onChangeGender} ></input>
                                <label className="form-check-label ml-0 mr-5">Female</label>
                                <input type="checkbox" className="form-check-input" 
                                        value ='others'
                                        id = "others"
                                        required = {this.state.gender === '' ? true:false}
                                        onChange = {this.onChangeGender}></input>
                                <label className="form-check-label ml-0 ">others</label>
                                <small className ="text-danger ml-3">{this.state.errors.gender}</small>
                            </div>
                            <div className="form-group mb-1">
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
                            <div className="form-group mb-1">
                                <label >Password</label>
                                <input type="password" className="form-control" 
                                        placeholder="Password"
                                        value = {this.state.password}
                                        onChange = {this.onChangePassword}>
                                </input>
                                <small className ="text-danger">{this.state.errors.password}</small>
                            </div>
                            
                            <button type="submit" className="btn btn-primary mt-2 w-25">Submit</button>
                        
                            </form>
                        </div>
                </div>
        </div>
        )
    }
}
