
import React,{useState , Component , useEffect} from 'react'
// import React, { Component } from 'react'
import axios from 'axios'
import {BiDownload} from 'react-icons/bi'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
 import { Document } from 'react-pdf'
 import { FaHeart as Like  } from 'react-icons/fa';
import { FiHeart as UnLike } from 'react-icons/fi';
import { AiOutlineStar,AiFillStar } from 'react-icons/ai';
import { FaRegBookmark as UnBookmark ,FaBookmark as Bookmark} from 'react-icons/fa'
import {BiArrowBack as BackIcon} from 'react-icons/bi'
import {IoIosStarHalf} from 'react-icons/io'

export default function BookView(props) {

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  
  // for onchange event
  const [pdfFile, setPdfFile]=useState(null);
  const [pdfFileUrl, setPdfFileUrl]=useState(null);
  const [pdfFileError, setPdfFileError]=useState('');

  // for submit event
  const [viewPdf, setViewPdf]=useState(false);

  //book view details

  const [book,setBook] = useState(null);

//load the book contents
useEffect(() => {
    // Update the document title using the browser API
   // console.log(props.location.state.id, 'this is the id of the book to be displayed')

    axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/${props.location.state.id}` , { params: {
        searchFor : 'book'
      }})
    .then(res =>{
        
         setBook(res.data[0])
        
        console.log(book)
       
    })
    .catch(err => console.log(err))
    

    axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/${props.location.state.id}` , { params: {
        searchFor : 'bookPdf'
      }})
    .then(res =>{
        
          //  console.log(res.data[0].pdfUrl);
          setPdfFileUrl(res.data[0].pdfUrl);
       
    })
    .catch(err => console.log(err))
    
  },[]);

 const handlePdfView = (e) => {
     if(viewPdf===false)
     setViewPdf(true);
     else
     setViewPdf(false)
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
if(viewPdf==false)
  return (
    <div className ={`container-fluid `} style = {{width:`100%`}}>

    <div className='navbar  navbar-light mb-5 ' style= {{height : '50px',backgroundColor:'#f0f8ff'}}>
      <a href='/' >
              <BackIcon size={25} color={'black'}/></a>

  </div >  
    { book!=null ?
        <div >
          <div className = {`text-left d-flex`}>
          <div style={{width:'30%',marginRight:'10%'}}>
                <img  style = {{width : '100%',height:'200px'}}
                src ={book.imgUrl}></img>
        </div>

    
        

        <div style={{width:'70%'}} > 

                <p className ='mb-0 h6 ' 
                            style={{fontSize:'20px'}}>
                            { book.name} :</p>
                        
                        <p className ='mb-0' style = {{fontSize:'18px'}}> 
                        by {book.author}
                        </p>
                  <br/>
                  <span   style = {{fontSize:'20px',marginRight:'10px'}}>
                          Id : 
                          <span style={{fontSize:'20px',marginLeft:'20px'}}>
                            {book.id}
                            </span>
                  </span>
                  

                <br/>
                  <span   style = {{fontSize:'20px',marginRight:'10px',marginTop:'5px'}}>
                          Category : 
                          <span style={{fontSize:'20px',marginLeft:'20px'}}>
                            {book.category}
                            </span>
                          
                  </span>
                        
                <br/>
                  <span   style = {{fontSize:'20px',marginRight:'10px',marginTop:'5px'}}>
                          Type : 
                          <span style={{fontSize:'20px',marginLeft:'20px'}}>
                            {book.type}
                            </span>
                  </span>
                  <br/>
                  <span >

                    <span   style = {{fontSize:'20px',marginRight:'10px'}}>
                    Rating : {book.rating/2}/5
                    </span>
                    <span style={{fontSize:'30px',marginLeft:'20px'}}>{setStars(book.rating/2 , 5)}</span>

                    </span>
                
            </div>
            <div className='pdf-container'>

              <div className='text-center'>
                  <button className='btn btn-primary mb-2' onClick={() =>handlePdfView()}>
                      {viewPdf === false ? <span>Open</span> : <span>Close Book</span>}
                  </button>
              </div>
                  
              </div>
        </div>
        <div className='mt-5'>
          <p className='h5'>Description :</p>
          <p style={{fontSize:'20px'}}> {book.description}</p>
        </div>
    </div>
    :
    <span>Unable to fetch book data</span>
    }
    
</div>
 
  )
  else
  {
    return     <div>
          <div className='navbar  navbar-light' style= {{height : '50px',backgroundColor:'#f0f8ff'}}>
      <a href='/' >
              <BackIcon size={25} color={'black'}/></a>
              <button className='btn btn-primary mb-2' onClick={() =>handlePdfView()}>
                      {viewPdf === false ? <span>Open</span> : <span>Close</span>}
                  </button>
              </div>
      <object data={pdfFileUrl} type="application/pdf" 
                                    width="100%" 
                                    style={{height:'100vh'}}>
                                </object> 
      </div>
  }
}
