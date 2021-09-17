import React, { Component , useState ,useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Body from '../body/Body';
import Footer from '../footer/Footer';


export default function Home() {
    const [query, setQuery] = useState(null)
    
    const isLogin = JSON.parse(localStorage.getItem('islogin'))?true:false;
    
    const search = (query) =>{
        // console.log(query)
        setQuery(query);
    }
    const  getLoginState = () =>{
        return isLogin ;
    }
    

    return (
        <div>
        {/* {this.state.searchQuery} */}
        <Navbar search = {search} islogin = {getLoginState()}  ></Navbar>
        
        
                
        <Body query={query}></Body>
        <Footer></Footer>
    </div>
    )
}
