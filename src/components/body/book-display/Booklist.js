import React, { useState,useEffect} from 'react'
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

        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/books/`, { params: {
            column : 'distinct category',
            lowerLimit : '0' ,
            upperLimit : `3` ,
          }})
        .then(res =>{
            let categories = [];
            for(let i =0;i<res.data.length;i++)
            categories[i] = res.data[i].category;

            setCategoryList(categories)
        })
        .catch(err => console.log(err,'1'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if(props.query!=null)
        {
            setPrintQuery(<BookListComponent  
                column = '*'
                field = {props.query.searchFor}
                fieldValue = {props.query.searchValue}
                searchType = 'like'
                lowerLimit = '0'
                upperLimit = '10'
                viewType = 'vertical'
                login={props.login}/>)
        }
        else
        {
            return ;
        }
    }, [props.query])

    const viewMore = (cat) =>{
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`,{ params : {
            searchForColumn : `count(case category when '${cat}' then 1 else null end) as Count`,
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
                                    <span className="btn btn-link" onClick={() => viewMore(cat)}>View More</span>
                                </h5>
                        </div>
                        <BookListComponent  
                                    column = '*'
                                    field = 'category'
                                    fieldValue = {cat}
                                    lowerLimit = '0'
                                    upperLimit = '6'
                                    viewType = 'horizontal'
                                    login={props.login}/>
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

    if(props.query===null&&view===false)
    return (
        <div className = ' mt-4 p-0'>
            {displayCategoryList()}
        </div>
    )
    else
    {
        return (
            
            <div className = ' mt-4 p-0'>

                {   view!==false && props.query===null ?
                    <span>
                        <div className='ml-5 mb-3'>
                            <span className="btn btn-link" onClick={() => setView(false)}>
                                    <BackIcon size={25} color={'black'}/></span>

                        </div>
                                <BookListComponent  
                                    column = '*'
                                    field = 'category'
                                    fieldValue = {view}
                                    lowerLimit = {lowerLimit}
                                    upperLimit = {lowerLimit + 5}
                                    viewType = 'vertical'
                                    login={props.login}/>
                        <div className='text-center'>
                        
                            <span className="btn btn-link">
                            <BackwardIcon size={30} onClick={() => changeTab(-5)}></BackwardIcon>
                            </span>
                            <span className="btn btn-link">
                            <ForwardIcon size={30} onClick={() => changeTab(5)}></ForwardIcon>
                            </span>
                        </div>                        
                    </span>
                    :
                    <span>{printQuery}</span>
                }
                     
                        
            </div>
        )
    }
}
