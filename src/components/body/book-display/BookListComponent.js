import React, {  useState , useEffect} from 'react'
import BookContainer from './BookContainer';

import axios from 'axios' ;


export default function BookListComponent(props) {

    const [books, setBooks] = useState([]);
    
    const viewType = props.viewType;
    const  query = {}; 
    // const login = props.login ;
    if(props.column) query.column = props.column ;
    if(props.field)  query.field =  props.field ; 
    if(props.fieldValue)  query.fieldValue = props.fieldValue ; 
    if(props.searchType)  query.searchType = props.searchType ; 
    if(props.lowerLimit)  query.lowerLimit = props.lowerLimit ; 
    if(props.upperLimit)  query.upperLimit = props.upperLimit ; 


    useEffect(() => {
        //  console.log(process.env.REACT_APP_SERVER_ADDRESS)
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/books/`, { params: query})
        .then(res =>{
            //console.log(res.data);
               setBooks(res.data)  ;
        })
        .catch(err => console.log(err,'1'))

        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [props ])



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
                                    key={indx}
                                    login = {props.login}
                                    />
            else
            return <BookContainer 
                                    viewType = 'Frame'
                                    state = {val} 
                                    key={indx}
                                    login = {props.login}
                                    />             
                    
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

