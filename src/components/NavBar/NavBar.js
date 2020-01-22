import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

function NavBar(props) {
    if (!localStorage.getItem("token")) {
        return (
            <div className="nav">
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>
        );
    }
    else {
        return (
            <div className="nav">
                <Link to="/">Home</Link>
                <Link onClick={() => { console.log("Deleting token and logging out"); localStorage.removeItem("token"); props.history.push("/login"); }}>Log Out</Link>
            </div>
        );
    }
}

export default withRouter(NavBar);
