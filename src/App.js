import React, { Component } from 'react'

class App extends Component {

    constructor() {
        super()
      }

    componentWillMount() {
        this.getData()
    }

    getData() {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
    
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
          console.log(xhr.responseText)
        })
        // open the request with the verb and the url
        xhr.open('GET', 'http://localhost:4567/User/GetTest')
        // send the request
        xhr.send()
      }

    render() {

        var data = "datadinges";
        try{
        return (
            <div className="App">
                <div className="topnav">
                    <a href="#">Login</a>
                    <a href="#">Contact</a>
                    <a href="#">About</a>
                </div>

                <div className="content">
                    <div className="title1">BuddyFinder</div>
                    <p>{data = "Dikkertje"}</p>

                    <div className="titletext"><center><p>Find buddies for your favorite activities!</p></center></div>
                    <div className="button1">Get Started ></div>

                    <p>{data}</p>

                </div>

                <div className="footer">
                    <div className="footertext">
                        <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                    </div>
                </div>
            </div>
        )
        }
        catch(err)
        {
            console.log(err);
        }
    }
}

export default App;