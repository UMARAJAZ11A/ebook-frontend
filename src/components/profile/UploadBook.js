import axios from 'axios';
import React, {  useState } from "react";

 export default function UploadBook(){


     const [bookName, setBookName] = useState("");
     const [authorName, setAuthorName] = useState("");
     const [rating, setRating] = useState(0);
     const [category, setCategory] = useState("");
     const [type,setType] = useState("");

     const [date, setDate] = useState(new Date());
     const [description, setDesiption] = useState("");
     const [file, setFile] = useState("");     
     const [image,setImage] = useState("");
     const onSubmitHandler = (e) => {
        
        e.preventDefault();
     
        let id = parseInt(Date.now() + Math.random() + bookName + authorName);

        console.log(category);
        let bookData = new FormData();

        bookData.append(
            'file',
            file,
            `${file.name}`
        );

        bookData.append(
            'file',
            image,
            `${image.name}`
        );

        console.log(bookData)
        const book = {
            id: id,
            bookName: bookName,
            authorName: authorName,
            rating: rating,
            category: category,
            type: type,
            date: date,
            description: description,
            imgName: image.name,
            pdfName: file.name
        }
        const token = localStorage.getItem('token')
        
       
        axios.post(`${process.env.REACT_APP_SERVER_ADDRESS}/book/upload`,bookData , 
                    { headers: {"Authorization" : `token ${token}`} , withCredentials: true , params :{ book : book } })
            .then(res => {
                 console.log(res.data.message);
                
            })
            .catch(err => {
                console.log(`Error : ${err}`);
            })

    }
     
     return (
        <div className="ml-5 mt-3">
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

                <button type="submit" className="btn btn-primary mt-1" >Submit</button>


            </form>
          
        </div>
    )
 
    }
