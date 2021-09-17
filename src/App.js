import Login from './components/login/Login'
import Create from './components/login/Create';
import { BrowserRouter as Router,Route,Switch ,Redirect} from 'react-router-dom';
import UserProfile from './components/profile/UserProfile'
import Home from './components/home/Home'
import BookView from './components/body/book-display/BookView';
import ViewPdf from './components/profile/ViewPdf';


function App() {
  return (
    <div className="">
      <Router >
        
        <Switch>
          <Redirect from="/" exact to="/home" />
          <Route path ='/home' component ={Home}></Route>
          <Route path = '/login' component ={Login}></Route>
          <Route path = '/profile' component ={UserProfile}></Route>
          <Route path = '/create' component ={Create}></Route>
          <Route path = '/bookview' component = {BookView}></Route>
          <Route path = '/viewpdf' component = {ViewPdf}></Route>
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
