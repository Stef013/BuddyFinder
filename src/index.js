import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Contact from './Contact';
import Home from './Home';
import NewProfile from './NewProfile';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/newprofile" component={NewProfile} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'))