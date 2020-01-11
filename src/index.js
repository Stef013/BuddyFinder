import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Home from './Home';
import NewProfile from './NewProfile';
import Profile from './Profile';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/home" component={Home} />
        <Route path="/newprofile" component={NewProfile} />
        <Route path="/profile/:id" component={Profile} />
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'))