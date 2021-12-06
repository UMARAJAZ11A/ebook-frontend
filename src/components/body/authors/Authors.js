
import React, {  useEffect , useState  } from 'react'
import axios from 'axios';

export default function Authors() {
    const [category, setCategory] = useState('')
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/book/`, { params: {
            searchListType : 'category' ,
            searchList : '' ,
            searchColumn : 'distinct author'
            
          }})
        .then(res =>{
                console.log(res.data)
                setCategory(res.data)  ;
        

        })
        .catch(err => console.log(err,'1'))
        
    }, [])
    const displayCategoryList = () => {
        
        return category.map(cat => {
            return <a 
                        href="#" 
                        key={cat.author}
                        className='list-group-item mr-4 w-25 '>
                                                {cat.author}
                    </a>
        }) 
    }
    return (
        <div className="container-fluid m-5 list-group" style={{fontSize:'25px'}}>
        <h4>Here are the List of Authors</h4>
        
           
            {
                category!==''?
                <div>
                    {displayCategoryList()}
                </div>
                :
                <div>
                    No Author available
                </div>
            }

        
    </div>
    )
}

