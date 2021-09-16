
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header} from '../Header/Header';
import {Homepage} from '../Homepage/Homepage';
import {Login} from '../Login/Login';
import {Register} from '../Register/Register';
import {NavigationBar} from '../Navbar/Navbar';
import { Header2 } from '../Header2/Header2';
import { Management } from '../Management/Management';
import { SessionUserProvider } from '../../Context/SessionUserContext';
import { ManageBooks } from '../Management/ManageBooks';
import { ManageUsers } from '../Management/ManageUsers';
import { AddBooks } from '../Management/AddBooks';



function App() {
  return (
    <div>
      <SessionUserProvider>
        <Router>
        <Header />
        <Header2 />
        <NavigationBar/>
          <Switch>
            <Route path="/login" component={()=> <Login/>}/>
            <Route path="/register" component={()=> <Register/>}/>
            <Route path="/management/books/add" component={()=> <AddBooks/>}/>
            <Route path="/management/books" component={()=> <ManageBooks/>}/>
            <Route path="/management/users" component={()=> <ManageUsers/>}/>
            <Route path="/management" component={()=> <Management/>}/>
            <Route path="/" component={()=> <Homepage/> }/>
          </Switch>
        </Router>
      </SessionUserProvider>

      
    </div>
  );
}

export default App;
