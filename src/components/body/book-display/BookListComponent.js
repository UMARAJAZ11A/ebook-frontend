import React, { Component , useState , useEffect} from 'react'
import BookContainer from './BookContainer';
import {Link} from 'react-router-dom';
import axios from 'axios' ;


export default function BookListComponent(props) {

    const category = props.category;
    const searchForColumn = props.searchForColumn ;
    const searchInColumn = props.searchInColumn ; 
    const searchValue = props.searchValue ; 
    const matchType = props.matchType;
    const [list,setList] = useState(props.list) ;
    const [listType,setListType] = useState(props.listType) ;
    const [books, setBooks] = useState([]);
    const viewType = props.viewType;


    useEffect(() => {
        //  console.log(process.env.REACT_APP_SERVER_ADDRESS)
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`, { params: {
            searchForColumn : searchForColumn ,
            searchInColumn : searchInColumn ,
            searchValue : searchValue ,           
          }})
        .then(res =>{
            //console.log(res.data);
               setBooks(res.data)  ;
        })
        .catch(err => console.log(err,'1'))
        
    }, [searchForColumn,searchValue,searchInColumn])


    const displayBooks = () =>
    {
        return books.map((book,indx) => {
            let val = {
                id : book.id ,
                bookName : book.name,
                authorName : book.author,
                rating : book.rating/2,
                liked : book.liked ,
                imgUrl : book.imgUrl ,
                
            }
            if(viewType==='vertical')
            return <BookContainer 
                                    viewType = 'Card'
                                    state = {val} 
                                    key={indx}/>
            else
            return <BookContainer 
                                    viewType = 'Frame'
                                    state = {val} 
                                    key={indx}/>             
                    
        })

    }
    return (
        <div className ="mb-5 ml-4 container-fluid  p-0 ">
            {/* <div className ="container-fluid d-flex">
                <h5 className ="w-50 text-left ml-4">{category}</h5>
                <h5 className ="h6 w-50 text-right mr-4"><a href = "#">View More</a></h5>
            </div> */}
            
            {displayBooks()}
            {/* {
                listType==='bookIds' ?
                <h1></h1>
                :
                <h1>bab</h1>
            } */}

        </div>
    )
}

