import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Movies from '../components/Movies';
import NavBar from '../components/NavBar';
import Theatre from '../components/Theatre';

function TheatreRouter() {
    return (
        <Router>   
            <NavBar/> 
            <Switch>
                <Route path="/theatre" component={Theatre} />
                <Route path="/" component={Movies} />
            </Switch>
        </Router>
    )
}

export default TheatreRouter;
