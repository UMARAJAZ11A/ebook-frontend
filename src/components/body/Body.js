import React, { Component } from 'react'
import { BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom';
import Booklist from './book-display/Booklist'
import Tabs from './categories/Tabs';
import BodyNav from './BodyNav'
import Authors from './authors/Authors';


export default function Body(props) {
    
    return (
        <div>
                
        <BodyNav></BodyNav>
        {/* <Booklist></Booklist> */}
        <Switch>
            
            <Route path ='/home/' exact ><Booklist query={props.query}/></Route>
            {/* <Redirect from = '/home/' exact to = '/home/overview'></Redirect> */}
            {/* <Route path ='/bookview' ><BookView/></Route> */}
            <Route path ='/home/categories' exact ><Tabs tabItem ='category' key={0}/></Route>
            <Route path ='/home/authors' exact ><Tabs tabItem ='author' key={1}/></Route>
            <Route path ='/home/type' exact ><Tabs tabItem ='type' key={2}/></Route>
            <Route path ='/home/name' exact ><Tabs tabItem ='name' key={3}/></Route>
        </Switch>
   
</div>
    )
}

