import React from 'react'


export default function ProfileHome(props) {
    
    const user = props.user;

    return (
        <div className='ml-4'>
            <h1 style={{textAlign : 'center' , paddingTop : '50px' }} className='text-secondary'>
                Welcome to the Dashboard {user.firstName} !</h1>
                <h3 style={{textAlign : 'center' , marginBottom : '150px'}} className='text-secondary'>
                    You are a {user.role} !</h3>
           <br/>
           <div className='d-flex w-75 m-auto'>
                <div >
                    <img style={{height : '300px'}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCy6aOJbmGrqdsdOBPCp2_lfPv3Z-QFReD4A&usqp=CAU" alt=''>
                    </img>
                </div>
                <div className='ml-5 p-4 d-flex'>
                    <div>
                        <h2 className='text-secondary'>Email    </h2>
                        <h2 className='text-secondary'>First Name    </h2>
                        <h2 className='text-secondary'>Last Name    </h2>
                        <h2 className='text-secondary'>Gender    </h2>
                        <h2 className='text-secondary'>Date Of Birth    </h2>

                    </div>
                    <div className='ml-4'>
                            <h2 className='text-info'> {user.email}</h2>
                            <h2 className='text-info'> {user.firstName}</h2>
                            <h2 className='text-info'> {user.lastName}</h2>
                            <h2 className='text-info'> {user.gender}</h2>
                            <h2 className='text-info'> {user.dateOfBirth}</h2>
                    </div>

                </div>

           </div>

        </div>
    )
}
