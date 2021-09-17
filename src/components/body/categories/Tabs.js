import React, { Component , useEffect , useState } from 'react'
import BookListComponent from '../book-display/BookListComponent';
import {BiArrowBack as BackIcon} from 'react-icons/bi'
import {IoIosArrowForward as ForwardIcon} from 'react-icons/io'
import {IoIosArrowBack as BackwardIcon} from 'react-icons/io'
import axios from 'axios';

export default function Tabs(props) {
    const tabItem = props.tabItem ;
    const [numberOfTabs, setNumberOfTabs] = useState(0);
    const [currentTab, setCurrentTab] = useState(0)
    const [list, setList] = useState('')
    const [tabItemList, setTabItemList] = useState([])
    const [view,setView] = useState(false)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`, { params: {
            searchForColumn : `distinct ${tabItem}`,
            searchInColumn : ``,
            searchValue :``,
            
          }})
        .then(res =>{
                // console.log(res.data)
                setTabItemList(res.data)  ;
                setNumberOfTabs(Math.ceil(res.data.length/10))

        })
        .catch(err => console.log(err,'1'))
        
    }, [tabItem])
    const viewtabItemBook = (val) => {
        console.log(val)
        setView(val);
    }
    const displaytabItemList = () => {

        return tabItemList.map((cat , indx) => {
            // console.log(currentTab)
            if(indx>=currentTab&&indx<10+currentTab)
            return  <tr key={indx}>
                        <th scope="row">{indx+1}</th>
                        <td                         
                                    onClick = {() => viewtabItemBook(Object.values(cat)[0])}
                                    key={indx}
                                    className='text-primary'>
                                    {Object.values(cat)[0]}
                                
                        </td>
                    </tr>
        }) 
    }
useEffect(() => {
        setList(displaytabItemList());
}, [currentTab,tabItem,tabItemList])

const changeTab = (indx) => {
    let limit = currentTab + indx;
    if(limit<0||limit>numberOfTabs*10-10)
    {
        limit = 0;
    }
    setCurrentTab(limit)
    
}

    if(view==false)
    return (
        <div className="container-fluid ml-5 mt-4 list-group" style={{fontSize:'18px'}}>
        
           
            {
                tabItemList!='' ?
                <div style={{marginRight:'10%'}}>
                            <table className="table table-hover ">
                            <thead className="">
                                <tr>
                                <th scope="col">S.NO</th>
                                <th scope="col">{tabItem.toUpperCase()}</th>
                                </tr>
                            </thead>
                            <tbody> 
                                 {list}
                            </tbody>
                            </table>
                </div>
                :
                <div>

                </div>
            }
            {/* <div className='text-center'>{displayTabs(Math.ceil(tabItemList.length/10))}</div> */}
            <div className='text-center'>
                            
                            <a href='#'>
                            <BackwardIcon size={30} onClick={() => changeTab(-10)}></BackwardIcon>
                            </a>
                            <a href="#">
                            <ForwardIcon size={30} onClick={() => changeTab(10)}></ForwardIcon>
                            </a>
            </div> 
       
    </div>
    )
    else
    return (
        <div className="container-fluid" style={{fontSize:'25px'}} >
               
        <div className ="container-fluid d-flex">
        <h5 className ="w-50 text-left ml-4">{view}</h5>

        </div>
        <BookListComponent  
            searchForColumn = '*'
            searchInColumn ={`where ${tabItem}=`+ `'` + `${view}` + `'`} 
            searchValue = {`LIMIT 0,5`} 
            viewType = 'vertical'
            />
           
        </div>
        
    )
}
