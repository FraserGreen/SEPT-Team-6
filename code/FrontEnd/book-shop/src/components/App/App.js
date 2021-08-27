
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Header} from '../Header/Header';
import {Homepage} from '../Homepage/Homepage';
import {Login} from '../Login/Login';
import {Register} from '../Register/Register';
import {NavigationBar} from '../Navbar/Navbar';
import { Header2 } from '../Header2/Header2';


function App() {
  return (
    <div>
      <Router>
      <Header />
      <Header2 />
      <NavigationBar/>
        <Switch>
          <Route path="/" component={()=> <Homepage/> }/>
          {/* <Route path="/login" component={()=> <Login/>}/>
          <Route path="/register" component={()=> <Register/>}/> */}
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
