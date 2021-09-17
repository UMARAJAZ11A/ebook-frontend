import React, { Component , useState,useEffect } from 'react'
import axios from 'axios';
import BookListComponent from '../body/book-display/BookListComponent';


export default function LikedSaved(props) {
    
    const [bookList, setBookList] = useState('');
    const id = localStorage.getItem('id');            /// user id
    useEffect(() => {
      
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/create/${id}` , { params : {
            key :  props.type
        } })
        .then(res => {
            console.log(Object.values(res.data[0])[0]);
            setBookList(Object.values(res.data[0])[0]);
        })
        .catch(err => {
            console.log(err);
        })
        
    },[])

    return (
        <div className='ml-3'>
        <h4>Here {props.type} Books</h4>
        {
            bookList ?
                <BookListComponent  
                                    searchForColumn = {`*`}
                                    searchInColumn = {`where id IN(${bookList})`}
                                    searchValue = {`LIMIT 0,6`}
                                    viewType = 'vertical'/>
                :
                <h5>Your {props.type} books is empty</h5>
        }
        
    </div>
    )
}

