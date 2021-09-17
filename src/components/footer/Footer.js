import React from 'react'
import {AiOutlineInstagram as Instagram ,
        AiOutlineTwitter as Twitter,
        AiFillFacebook as Facebook,
        AiOutlineWhatsApp as WhatsApp,
        AiFillLinkedin as Linkedin ,
        AiFillAppstore as WindowsStore} from 'react-icons/ai'
import {SiGmail as Gmail} from 'react-icons/si'
import {FaGooglePlay as GoogleStore} from 'react-icons/fa'
export default function Footer() {
    return (
        <div>
        <div style = {{backgroundColor:'#f0f8ff'}} className='d-flex'>
            <br/>
             <div className='container-fluid d-flex m-4 w-75'>
                <div className='mr-2 w-25'>
                        <p className='h6 m-0'>About</p>
                        <br/>
                        <p className='m-0 btn-link btn-sm text-dark p-0'>About E-book</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Our blog</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Join our team!</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Invite friends</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Gifts</p>
                        <br/>
                </div>
                <div className='mr-2 w-25'>
                        <p className='h6 m-0 '>Support</p>
                        <br/>
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Help/FAQ</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Accessibility</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Publishers</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Purchase help</p>
                        
                        
                </div>
                <div className='mr-2 w-25' >
                        <p className='h6 m-0  '>Legal</p>
                        <br/>
                        <p className='m-0  btn btn-link btn-sm text-dark p-0'>Terms</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Privacy</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Copyright</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>Preferences</p>
                        
                </div>
                <div >
                        <p className='h6 m-0 '>Social</p>
                        <br/>
                        <p className='m-0 btn-link btn-sm text-dark p-0'>
                            <Instagram size={20}/> : Instagram</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>
                            <Twitter size={20}/> : Twitter</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>
                            <Facebook size={20}/> : Facebook</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>
                            <WhatsApp size={20}/> : Whatspp</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>
                            <Gmail size={20}/> : Gmail</p>
                        
                        <p className='m-0 btn-link btn-sm text-dark p-0'>
                            <Linkedin size={20}/> : Linkedin</p>
                        <br/>
                        <br/>
                        
                </div>
            </div>  
                <div className='w-25 container mt-4 text-center'>
                    <p>Get our free apps</p>
                    <GoogleStore className=' btn btn-link btn-sm text-dark p-0 mb-4' size={40}/>
                    <br></br>
                    <WindowsStore className=' btn btn-link btn-sm text-dark p-0' size={40}/>
                </div>
                
        </div>
        <div style = {{backgroundColor:'#f0f8ff'}}>
            <p className='text-center  border-top'>Copyright © 2021 : Umar Ajaz</p>
            <br/>
        </div>
    </div>
    )
}

