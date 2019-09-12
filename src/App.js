import React, { Component } from 'react'

class App extends Component {

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


                    <script type="text/javascript" src="httpscript.js"></script>

                    <script type="text/javascript">
                        console.log("VUILE KENKER")
                        const http = new XMLHttpRequest()
                    
                        http.open("GET", "http://localhost:4567/User/GetTest")
                        http.send()
                    
                        http.onload = () => console.log(http.responseText)

                    </script>

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