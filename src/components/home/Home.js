import React, {  useState ,useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Body from '../body/Body';
import Footer from '../footer/Footer';
import axios from 'axios';

export default function Home() {
    const [query, setQuery] = useState(null)
    const [login , setLogin] = useState(false);
    
    // const isLogin = false ;//JSON.parse(localStorage.getItem('islogin'))?true:false;
    useEffect(() => {

        const token =localStorage.getItem('token')?localStorage.getItem('token'):false;
        //  console.log(token);
        if(token===false)
        {
            setLogin(false);
        }
        else
        {
            //authorizing the user
                axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/auth`, { headers: {"Authorization" : `token ${token}`} })
                .then(res => {
                    setLogin(true);
                })
                .catch(err => {
                    console.log(err);
                    setLogin(false);
                })
        }        
    
    }, [])

    
    const search = (query) =>{
        // console.log(query)
        setQuery(query);
    }

    

    return (
        <div>
        {/* {this.state.searchQuery} */}
        <Navbar search = {search}   ></Navbar>
        
        <Body query={query} login={login}></Body>

        
        <Footer></Footer>
    </div>
    )
}
