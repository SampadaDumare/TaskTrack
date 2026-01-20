
import './App.css';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Admin from './components/Admin';
import Manager from './components/Manager';
import Employee from './components/Employee';
import UserState from './context/UserState';
import AddTask from './components/AddTask';
import AllTasks from './components/AllTasks';

function App() {
  return (
    <>
      <UserState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/admin">
              <Admin />
            </Route>
            <Route exact path="/manager">
              <Manager />
            </Route>
            <Route exact path="/employee">
              <Employee />
            </Route>
            <Route exact path="/addTask/:projectId">
              <AddTask />
            </Route>
            <Route exact path="/allTasks">
              <AllTasks />
            </Route>
          </Switch>
        </Router>
      </UserState>
    </>
  );
}

export default App;
