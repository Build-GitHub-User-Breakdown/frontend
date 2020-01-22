import React from 'react';
import './css/App.css';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from "./authorization/PrivateRoute";
import Register from "./components/Register/Register";
import Search from "./components/Search/Search";
import GitHubUser from './components/GitHubUser/GitHubUser';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <Route path="/login" component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute exact path='/' component={Home} />{/*should automatically re-route to Login if not logged in */}
        <PrivateRoute exact path='/search/:searchTerm' component={Search} />
        <PrivateRoute exact path='/user/:username' component={GitHubUser} />
      </div>
    </Router>
  );
}

export default App;
