import React, { Component } from 'react'
import Table from './Table'

class App extends Component {
    render() {
        return (
            <body>
            <div className="App">
                <div class="topnav">
                    <a href="#">Login</a>
                    <a href="#">Contact</a>
                    <a href="#">About</a>
                </div>
                <div className="content">
                    <div className="title1">BuddyFinder</div>
                    <div className="titletext"><center><p>Find buddies for your favorite activities!</p></center></div>
                    <div className="button1">Get Started ></div>
                </div>

                <div className="footer">
                    <div class="footertext">
                        <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                    </div>
                </div>
            </div>
            </body>
        )
    }
}

export default App;