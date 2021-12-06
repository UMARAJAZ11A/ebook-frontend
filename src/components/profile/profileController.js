import axios from 'axios'
const getUserData = async ( url , body , params ) => {

    return new Promise((resolve, reject)=>{

        const token = localStorage.getItem('token')
        
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/${url}`,{ headers: {"Authorization" : `token ${token}`} , withCredentials: true , params : params })
        .then(res => {
            // console.log(res.data[0])
            return resolve(res) ;
        })  
        .catch(err => {
            return reject(err) ;
        })   
    });


}


export { getUserData }
