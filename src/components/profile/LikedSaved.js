import React, {  useState,useEffect } from 'react'
// import axios from 'axios';
import BookListComponent from '../body/book-display/BookListComponent';
import { getUserData } from './profileController'

export default function LikedSaved(props) {
    
    const type = props.type ;
    const [bookList, setBookList] = useState('');
    // const token = localStorage.getItem('token');            /// user id
    useEffect(() => {
      
        getUserData('me/books' , null , { key : type  })
        .then(res => {
            if(type === `liked`)
            setBookList(res.data.data.liked);  
            else
            setBookList(res.data.data.saved);   
        })
        .catch(err => {
            console.log(`Error : unable to load user data : ${err}`)
        }) 
       
    },[])

    return (
        <div className='ml-3'>
        <h4>Here {type} Books</h4>
        {
            bookList ?
                <BookListComponent  
                                    column = '*'
                                    field = 'id '
                                    fieldValue = {bookList}
                                    login={true}
                                    searchType = 'IN'
                                    lowerLimit = {0}
                                    upperLimit = {6}
                                    viewType = 'vertical'/>
                :
                <h5>Your {type} books is empty</h5>
        }
        
    </div>
    )
}

