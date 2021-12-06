import React, {  useEffect , useState } from 'react'
import BookListComponent from '../book-display/BookListComponent';
// import {BiArrowBack as BackIcon} from 'react-icons/bi'
import {IoIosArrowForward as ForwardIcon} from 'react-icons/io'
import {IoIosArrowBack as BackwardIcon} from 'react-icons/io'
import axios from 'axios';

export default function Tabs(props) {
    const tabItem = props.tabItem ;
    
    // const [list, setList] = useState('')
    const [tabItemList, setTabItemList] = useState([]) ;
    const [view,setView] = useState(false);
    const [index , setIndex] = useState(0);
    const [maxIndex , setMaxIndex] = useState(Infinity)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/list`, { params: {
            field : tabItem ,
            limit : 10 ,
            index : index 
          }})
        .then(res =>{
                
                setTabItemList(res.data.data)  ;
                

        })
        .catch(err => console.log(err,'1'))
        
    }, [tabItem])

    useEffect(() => {
        
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/list`, { params: {
            field : tabItem ,
            limit : 10 ,
            index : index 
          }})
        .then(res =>{
                

                if(res.data.length>0)
                setTabItemList(res.data.data)  ;
                else
                {
                    setMaxIndex(index-10);
                }
                

        })
        .catch(err => console.log(err,'1'))
        // setList(displaytabItemList());
    }, [index])



    const viewtabItemBook = (val) => {
        console.log(val)
        setView(val);
    }

    const displaytabItemList = () => {

        return tabItemList.map((cat , indx) => {

            return  <tr key={indx}>
                        <th scope="row">{ index<maxIndex ? index+1 + indx : maxIndex + 1 + indx }</th>
                        <td                         
                                    onClick = {() => viewtabItemBook(Object.values(cat)[0])}
                                    key={indx}
                                    className='text-primary'>
                                    {Object.values(cat)[0]}
                                
                        </td>
                    </tr>
            
        }) 
    }



    if(view===false)
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
                                 { displaytabItemList() }
                            </tbody>
                            </table>
                </div>
                :
                <div>

                </div>
            }
            {/* <div className='text-center'>{displayTabs(Math.ceil(tabItemList.length/10))}</div> */}
            <div className='text-center'>
                            
                            <span className='btn btn-link'>
                            <BackwardIcon size={30} onClick = {() => setIndex(index>0 ? index-10 : index)}  ></BackwardIcon>
                            </span>
                            <span className='btn btn-link'>
                            <ForwardIcon size={30} onClick = {() => setIndex(index<maxIndex ? index+10 : index)}  ></ForwardIcon>
                            </span>
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
                                            column = '*'
                                            field = {tabItem}
                                            fieldValue = {view}
                                            lowerLimit = '0'
                                            upperLimit = '5'
                                            viewType = 'vertical'/>
           
        </div>
        
    )
}
