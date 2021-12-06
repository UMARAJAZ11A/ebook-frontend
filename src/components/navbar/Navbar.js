import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import {ImBook as BookIcon} from 'react-icons/im'
import {CgProfile as ProfileIcon} from 'react-icons/cg'
import {BsSearch as SearchIcon} from 'react-icons/bs'
// import {BiUpload} from 'react-icons/bi'
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios'
export default class Navbar extends Component {
    constructor(props) {
        super(props)
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.onClickLogout = this.onClickLogout.bind(this);
        this.onChangeOption = this.onChangeOption.bind(this);
        this.state = {
            searchQuerry : '' ,
            searchFor : 'name' ,
            searchValue : '',
            islogin : false ,
            viewType : this.props.viewType?this.props.viewType: null
        }
    
    }


    onClickLogout(){

        const token =localStorage.getItem('token')?localStorage.getItem('token'):false;
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/logout` ,{ headers: {"Authorization" : `token ${token}`} , withCredentials: true  } )
        .then(res => {
            localStorage.removeItem('token');
            this.setState({
                islogin : false
            })
            console.log(res.data.message);
            window.location.reload();
        })
        .catch(err=>{
            console.log(err);
        }
        )

    }
    onChangeOption(e){
         console.log(e.target.value)
        const val = e.target.value ;

        if(val === 'Book')
        {
            this.setState({
                searchFor : 'name'
            })
        }
        else if(val === 'Author')
        {
            this.setState({
                searchFor : 'author'
            })
        }
        else if(val === 'Type')
        {
            this.setState({
                searchFor : 'type'
            })
        }
        else if(val ==='Category')
        {
            this.setState({
                searchFor : 'category'
            })

        }
        else
        {
            this.setState({
                searchFor : 'id'
            })
        }
        // console.log(this.state.searchFor)
    }
    onChangeSearch(e){
        
        
        this.setState({
            searchValue : e.target.value
        },() => {

            const query = {
                searchFor : this.state.searchFor ,
                searchValue : this.state.searchValue
            }
            if(this.state.searchValue==='')
            this.props.search(null);
            else
            this.props.search(query);
        })
        // console.log(this.state.searchValue)
        
    }
    onSubmitHandler(e){
        e.preventDefault();
        //  this.props.search(this.state.searchQuerry);
        return true ;
    }
    componentDidMount(){
        
        const token =localStorage.getItem('token')?localStorage.getItem('token'):false;
        //  console.log(token);
        if(token===false)
        {
            this.setState({

                islogin : false 
            }
            )
        }
        else
        {
            //authorizing the user
                axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth`, { headers: {"Authorization" : `token ${token}`} })
                .then(res => {
                    this.setState({
                        islogin : true
                    })
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        islogin : false
                    })
                })
        }

    }


    render() {
            return (
                <div>
                                    
                    <nav className="navbar  navbar-light "
                        style= {{height : '60px',backgroundColor:'#f0f8ff'}}>
                    <Link  to ='/home'>
                        <BookIcon size={50}  ></BookIcon>E-Book's
                    </Link>
                    { this.state.viewType ==null ?
                    <form onSubmit ={this.onSubmitHandler}
                    className="w-50 h-75">
                            <div className='border border-secondary ' 
                                    style={{backgroundColor:'white'}}>
                                <select id="cars" name="cars"
                                className='border-0'
                                style={{outline:'none'}}
                                onChange={this.onChangeOption}>
                                    <option >Book</option>
                                    <option >Author</option>
                                    <option >Category</option>
                                    <option >Type</option>
                                    <option >Id</option>
                                </select>
                                |
                                <input 
                                        type="text" 
                                        placeholder="Search by book/author/category/id" 
                                        onChange ={this.onChangeSearch}
                                        className='w-75 border-0'
                                        style={{outline:'none'}}>
                                        
                                </input>
                                <span type="submit" className='border-0 float-right mr-2' >
                                        <SearchIcon size={20}
                                        />
                                </span>
                            </div>
                            </form>
                            :
                            <span></span>
                            }

                            {/* <BiUpload size={25}></BiUpload> */}
                        {this.state.islogin ?
                                
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        <ProfileIcon size={35}></ProfileIcon>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Link to="/profile/home" className="dropdown-item">Profile</Link>
                                        <Dropdown.Item onClick={this.onClickLogout} >Logout</Dropdown.Item>
                                        <Dropdown.Item >About Us</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            :
                                <div  >
                                    <Link className="nav-link btn btn-primary text-white" 
                                        to=  {{  pathname: "/login"  }}>Login
                                    </Link>
                                    
                                </div> 
                        }
                        
                        
                    </nav>
                    
                
                </div>
            )
    }
}
