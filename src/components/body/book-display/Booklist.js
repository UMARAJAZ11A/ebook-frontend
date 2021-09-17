import React, { Component ,useState,useEffect} from 'react'
import BookListComponent from './BookListComponent'
import {BiArrowBack as BackIcon} from 'react-icons/bi'
import {IoIosArrowForward as ForwardIcon} from 'react-icons/io'
import {IoIosArrowBack as BackwardIcon} from 'react-icons/io'
import axios from 'axios'


export default function Booklist(props) {
    
    const [view,setView] = useState(false);
    const [numberOfTabs, setNumberOfTabs] = useState(0);
    const [printQuery, setPrintQuery] = useState('')
    const [lowerLimit, setLowerLimit] = useState(0);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {

        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`, { params: {
            searchForColumn : 'distinct category',
            searchInColumn : `` ,
            searchValue : `LIMIT 0,3` ,
          }})
        .then(res =>{
            let categories = [];
            for(let i =0;i<res.data.length;i++)
            categories[i] = res.data[i].category;

            setCategoryList(categories)
        })
        .catch(err => console.log(err,'1'))
    }, [])
    useEffect(() => {
        if(props.query!=null)
        {
            setPrintQuery(<BookListComponent  
                searchForColumn = '*'
                searchInColumn ={`where ${props.query.searchFor} like ` + `'`+`%`+`${props.query.searchValue}`+`%`+`'`} 
                searchValue = {`LIMIT 0,10`} 
                viewType = 'vertical'/>)
        }
        else
        {
            return ;
        }
    }, [props.query])

    const viewMore = (cat) =>{
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`,{ params : {
            searchForColumn : `count(case category when `+`'`+ `${cat}` + `' then 1 else null end) as Count`,
            searchInColumn : `` ,
            searchValue : `` ,
          }})
        .then(res =>{
            // console.log(res.data[0].Count)
            setNumberOfTabs(Math.ceil(res.data[0].Count/5));
        })
        .catch(err => console.log(err,'1'))
       setView(cat);
   }

    const displayCategoryList = () => {
        
        return categoryList.map((cat , indx) => {

            return  <span key = {indx}>
                        <div className ="container-fluid d-flex">
                                <h5 className ="w-50 text-left ml-4">{cat}</h5>
                                <h5 className ="h6 w-50 text-right mr-4">
                                    <a href = "#" onClick={() => viewMore(cat)}>View More</a>
                                </h5>
                        </div>
                        <BookListComponent  
                                    
                                    searchForColumn = '*'
                                    searchInColumn ={`where category=`+ `'` + `${cat}` + `'`} 
                                    searchValue = {`LIMIT 0,6`} 
                                    viewType = 'horizontal'
                                    />
                    </span>
        })
    }
    const changeTab = (indx) => {
        let limit = lowerLimit + indx ;
        if(limit<0||limit>(numberOfTabs-1)*5)
        {
            return 
        }
        console.log(limit)
        setLowerLimit(limit);

    }

    if(props.query==null&&view==false)
    return (
        <div className = ' mt-4 p-0'>
            {displayCategoryList()}
        </div>
    )
    else
    {
        return (
            
            <div className = ' mt-4 p-0'>

                {   view!=false && props.query==null ?
                    <span>
                        <div className='ml-5 mb-3'>
                            <a href='#' onClick={() => setView(false)}>
                                    <BackIcon size={25} color={'black'}/></a>

                        </div>
                                <BookListComponent  
                                    
                                    searchForColumn = '*'
                                    searchInColumn ={`where category=`+ `'` + `${view}` + `'`} 
                                    searchValue = {`LIMIT ${lowerLimit},${lowerLimit+5}`} 
                                    viewType = 'vertical'
                                    />
                        <div className='text-center'>
                            
                            <a href='#'>
                            <BackwardIcon size={30} onClick={() => changeTab(-5)}></BackwardIcon>
                            </a>
                            <a href="#">
                            <ForwardIcon size={30} onClick={() => changeTab(5)}></ForwardIcon>
                            </a>
                        </div>                        
                    </span>
                    :
                    <span>{printQuery}</span>
                }
                     
                        
            </div>
        )
    }
}
