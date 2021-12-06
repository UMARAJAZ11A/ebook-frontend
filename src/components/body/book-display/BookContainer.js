
import React, {  useEffect, useState } from 'react'
import { FaHeart as Like  } from 'react-icons/fa';
import { FiHeart as UnLike } from 'react-icons/fi';
import { AiOutlineStar,AiFillStar } from 'react-icons/ai';
import { FaRegBookmark as UnBookmark ,FaBookmark as Bookmark} from 'react-icons/fa'
import {IoIosStarHalf} from 'react-icons/io'
import {Link} from 'react-router-dom';
import axios from 'axios';



export default function BookContainer(props) {
    
    const id = props.state.id;
    const imgUrl = props.state.imgUrl;
    const bookName = props.state.bookName;
    const authorName = props.state.authorName;
    const rating= Number(props.state.rating);
    const bookUrl = '/bookview';
    const [like, setLike] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const islogin = props.login;
    
    useEffect(() => {
        if(islogin === true)
        {
            
            //Route to get the book is liked / saved or not 
            // axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/me/book/`)
            // To check if boook is liked by user or not 
            const token = localStorage.getItem('token')
            const params = { id : id }
            axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/me/favourite`,{ headers: {"Authorization" : `token ${token}`} , withCredentials: true , params : params })
            .then(res => {
                setLike(res.data.data.liked) ;
                setBookmark(res.data.data.saved) ;
                
            })  
            .catch(err => {
                console.log(err);
                
            })              
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const bookSaveLike = (key , value) => {

        const token = localStorage.getItem('token')
        const body = {
            key : key ,
            value : value === true ? `add` : `remove` ,
            bookId : id
        }
        axios.put(`${process.env.REACT_APP_SERVER_ADDRESS}/me/books`,body ,{ headers: {"Authorization" : `token ${token}`} , withCredentials: true  })
        .then(res => {
             console.log(res.data.message)
           
        })  
        .catch(err => {
            console.log(err);
        }) 

    }

    const onClickLike = () =>{       
        if(islogin === true){
            bookSaveLike('liked' , like === false?true:false);
            setLike(like === false?true:false);
        }
        else{
            alert('login to like the book');
        }
    }
    const onClickSave = () =>{
        if(islogin === true){
            bookSaveLike('saved' , bookmark === false?true:false);
            setBookmark(bookmark === false?true:false)
        }
        else{
            alert('login to save the book');
        }
    }
    const setStars = (totalRating , totalStars) => {
        if(totalStars<=0) 
            { return } 
        else if(totalRating>0.5)
            return <span>
                        <AiFillStar color='#ffa651'/>
                        {setStars(totalRating-1,totalStars-1)}
                    </span>
        else if(totalRating>0)
            return <span><IoIosStarHalf color='#ffa651' />
                        {setStars(totalRating-1,totalStars -1 )}
                    </span>
        else
            return <span><AiOutlineStar/>
                        {setStars(totalRating-1,totalStars -1 )}
                    </span>
    }


    if(props.viewType==='Frame')
    return (
        <div className ={`d-inline-block container text-left m-0`} style = {{width:`16%`}}>

            <div className = {`text-left `}>

                <Link 
                            className ='text-dark text-decoration-none'
                            to ={{
                                    pathname : bookUrl ,
                                    state : { id : id }
                                }}>


                    <div >
                        <img  style = {{width : '100%',height:'180px'}} 
                        src ={imgUrl}
                        alt=''></img>
                    </div>

            
                </Link>

                <div className ='mb-0 text-left ml-1'> 
                    <Link 
                                className ='text-dark text-decoration-none'
                                to ={{
                                        pathname : bookUrl ,
                                        state : { id : id }
                                    }}>
                            <p className ='mb-0 h6'>
                                {
                                    bookName.length<=31 ?
                                    <span>
                                        {bookName.toUpperCase()}
                                    </span>
                                    :
                                    <span>
                                        {bookName.slice(0,23).toUpperCase()}...
                                    </span>
                                } </p>
                            
                            <p className ='mb-0' style = {{fontSize:'12px'}}> {authorName}</p>
                        </Link>
                    </div>

                    <span   className ="p-0 ml-0 ">

                            {setStars(rating , 5)}
                            <span   style = {{fontSize:'12px',marginRight:'10px'}}>
                                    {rating}/5
                            </span>
                            
                    </span>

                <div className ="text-left d-inline">
                
                
                    <span   className ="mr-2 btn btn-link p-0 m-0" 
                            onClick = {() =>onClickLike()}>
                                {like===true?
                                    <Like color ="red" size ={17}/>
                                    :
                                    <UnLike color='red' size={17}/>
                                }
                                
                    </span>       
                    
                    <span   className ="btn btn-link p-0 m-0"
                            onClick = {() =>onClickSave()}>
                                {bookmark === true?
                                    <Bookmark size ={18} color ="#696969"/>
                                    :
                                    <UnBookmark size ={18} color ="#696969"/>
                            }
                    </span>
                
                
                </div>
            </div>
            
        </div>
    )
    else
    {
        return (
            <div className ={`d-inline-block container text-left mb-5`} style = {{width:`100%`}}>
                

            <div className = {`text-left d-flex`}>



                <div style={{width:'30%',marginRight:'10%'}}>
                        <img  style = {{width : '100%',height:'180px'}}
                        src ={imgUrl}
                        alt=''></img>
                </div>

            
                

                <div style={{width:'70%'}}> 

                        <p className ='mb-0 h6 ' 
                                    style={{fontSize:'20px'}}>
                                    { bookName} :</p>
                                
                                <p className ='mb-0' style = {{fontSize:'18px'}}> 
                                by {authorName}
                                </p>
                            
                        
                        <span   className ="p-0 ml-0 ">

                                <span   style = {{fontSize:'20px',marginRight:'10px'}}>
                                Rating : {rating}/5
                                </span>
                                <span style={{fontSize:'30px',marginLeft:'20px'}}>{setStars(rating , 5)}</span>
                                
                        </span>
                    
                        <br/>

                        <span   className =" btn p-0 m-0  text-left" 
                                style = {{fontSize:'20px',width:'28%'}}>
                                    Like:
                        </span>
                        <span   className =" btn btn-link p-0 m-0" 
                                onClick = {() =>onClickLike()}>
                                    
                                    {like === true?
                                        <Like color ="red" size ={20}/>
                                        :
                                        <UnLike color='red' size={20}/>
                                    }
                                    
                        </span>  

                        <br/>

                        <span   className =" btn p-0 m-0 text-left" 
                                style = {{fontSize:'20px',width:'28%'}}>
                                    BookMark:
                        </span>
                        <span   className ="btn btn-link p-0 m-0"
                                onClick = {() => onClickSave()}>
                                    {bookmark === true?
                                        <Bookmark size ={20} color ="#696969"/>
                                        :
                                        <UnBookmark size ={20} color ="#696969"/>
                                }
                        </span>
                </div>

                <div>
                        <Link 
                            className =' text-decoration-none btn btn-primary'
                            to ={{
                                    pathname : bookUrl ,
                                    state : { id : id }
                                }}>
                                View
                        </Link>
                </div>
            </div>
            
        </div>
        )
    }
}

