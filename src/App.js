import React, { Component } from 'react'
import Table from './Table'

class App extends Component {
    render() {
        return (
            <body>
            <div className="App">
                <div class="topnav">
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                    <a href="#">Link</a>
                </div>

                <div class="content">
                    <h1>BuddyFinder</h1>
                    <p>Find buddies for your favorite activities!</p>
                </div>

                <div class="footer">
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