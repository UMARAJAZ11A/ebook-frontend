import axios from 'axios';
import React, { useEffect, useState } from "react";
// import React, { Component } from 'react'
//  import { Document, Page, pdfjs } from "react-pdf";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
// import {Viewer} from '@react-pdf-viewer/core'
// import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
// import {Worker} from '@react-pdf-viewer/core';

// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
//   import  {a}  from '../../a.pdf';
 export default function UploadBook(){

     const [id,setId] = useState("");
     const [bookName, setBookName] = useState("");
     const [authorName, setAuthorName] = useState("");
     const [rating, setRating] = useState(0);
     const [category, setCategory] = useState("");
     const [type,setType] = useState("");
     const [imgUrl, setImgUrl] = useState("");
     const [pdfUrl, setPdfUrl] = useState("");
     const [date, setDate] = useState(new Date());
     const [description, setDesiption] = useState("");
     const [file, setFile] = useState("");     
     const [image,setImage] = useState("");
     const [imgName, setImgName] = useState("");
     const [pdfName, setPdfName] = useState("");
     const onSubmitHandler = (e) => {
        
        e.preventDefault();
        // console.log(this.state)
        let idGenerated = parseInt(Date.now() + Math.random() + bookName + authorName);
        // console.log(idGenerated,'this is id gen');
        setId(idGenerated);
        setImgName(image.name);
        setPdfName(file.name);
        console.log(category);
        const bookData = new FormData();
        // fileData.append()
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        bookData.append(
            'file',
            file,
            `${file.name}`
        );

        // const imageData = new FormData();
        bookData.append(
            'file',
            image,
            `${image.name}`
        );
        // console.log(this.state.file)
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/book/${id}`, bookData , config)
            .then(res => {
                // console.log(res.data,'data url;');
                
                setImgUrl(res.data.imgfileLocation);
                setPdfUrl(res.data.pdffileLocation);
                
                const state = {
                    id: id,
                    bookName: bookName,
                    authorName: authorName,
                    rating: rating,
                    category: category,
                    type: type,
                    imgUrl: res.data.imgfileLocation,
                    pdfUrl: res.data.pdffileLocation,
                    date: date,
                    description: description,
                    file: file,
                    image: image,
                    imgName: imgName,
                    pdfName: pdfName
                }
                    axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`,state)
                    .then(res => {
                        console.log('Data Added Successfully!');
                    })
                    .catch(err => {
                        console.log(`Error : Unable to post the data to local storage : ${err}`);
                    })
                
            })
            .catch(err => {
                console.log(`Error : Unable to post the data to google cloud : ${err}`);
            })

    }
     
     return (
        <div className="ml-3 ">
            <h4>Enter Book Details</h4>
            <form onSubmit={onSubmitHandler} encType='multipart/form-data'>
                    <div className="row mb-1 mr-3">

                            <div className="col ">
                                <label>Name</label>

                                <input className="form-control form-control-sm" type="text"
                                    onChange={(e) => setBookName(e.target.value)}>
                                </input>
                            </div>
                            
                            <div className="col">
                                <label>Author</label>

                                <input className="form-control form-control-sm " type="text"
                                    onChange={(e) => setAuthorName(e.target.value)}>
                                </input>
                            </div>
                            <div className='col'/>
                    </div>
                    <div className="row mb-1 mr-3">


                            <div className="col">
                                <label>Type</label>
                                <input className="form-control form-control-sm" type="text"
                                    onChange={(e) => setType(e.target.value)}>
                                    {/* <option>Top Rated</option>
                                    <option>Best Seller</option>
                                    <option>Recent</option> */}

                                </input>
                            </div>
                        
                            <div className="col">
                                <label>Category</label>

                                <input className="form-control form-control-sm" type="text"
                                    onChange={(e) => setCategory(e.target.value)}>
                                    {/* <option>biography</option>
                                    <option>Best Seller</option>
                                    <option>others</option> */}

                                </input>
                            </div>

                            <div className='col'/>

                    </div>
                    <div className="row mb-1 mr-3">

                            <div className="col">
                                <label>Rating</label>

                                <input className="form-control form-control-sm" type="number"
                                    onChange={(e) => setRating(e.target.value)}>
                                </input>
                            </div>
                            
                            <div className="col">
                                <label>Date of Publish</label>

                                <input className="form-control form-control-sm" type="date"
                                    onChange={(e) => setDate(e.target.value)}>
                                </input>
                            </div>

                            <div className="col"></div>

                    </div>
                    <div className="row mb-1 mr-3 mt-2">
    
                            <div className="col">
                                <label>Upload Image</label>

                                <input className="form-control " type="file"
                                    onChange={(e) => setImage(e.target.files[0])}>
                                </input>
                            </div>

                            <div className="col">
                                <label>Upload Pdf</label>

                                <input className="form-control " type="file"
                                onChange={(e) => setFile(e.target.files[0])} name="file">
                                </input>
                            </div>
                            
                            <div className='col'/>
                        

                    </div>
                <div className='row mb-1'>
                    <div className="col mr-3">
                        <label>Description</label>

                        <textarea className="form-control form-control-sm " rows="3" type="text"
                            onChange={(e) => setDesiption(e.target.value)}>
                        </textarea>
                    </div>
                    

                </div>

                <button type="submit" className="btn btn-primary mt-1">Submit</button>


            </form>
          
        </div>
    )
 
    }
