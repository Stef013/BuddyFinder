import React, { Component } from 'react'
import axios from 'axios';
import { empty } from 'rxjs';

// Global variables
var uname;
var pword;

class App extends Component {

    constructor() {
        super()
        this.sendPOST = this.sendPOST.bind(this);
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        document.getElementById("container2").style.display = 'none';
        this.getData()
    }

    getData() {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here

            const self = this;
            self.setState({ data: xhr.responseText });
            // this.setState({ name: name });
            console.log(this.state.data)
        })
        // open the request with the verb and the url
        xhr.open('GET', 'http://localhost:4567/User/GetTest')
        // send the request
        xhr.send()
    }

    switch(bool) {
        if(bool)
        {
            document.getElementById("container1").style.display = 'none';
            document.getElementById("container2").style.display = 'block';
        }
        else{
            document.getElementById("container1").style.display = 'block';
            document.getElementById("container2").style.display = 'none';
        }
    }

    login() {
        uname = document.getElementById("usernameBox").value;
        pword = document.getElementById("passwordBox").value;
        console.log("in login methode");
        console.log(uname);
        console.log(pword);

        if (!uname || !pword) {
            alert("Login in fields cannot be empty!")
        }
        else {
            this.sendPOST(uname, pword);
        }

    }

    sendPOST(name, password) {

        const LoginModel = {
            username: name,
            password: password,
        };

        console.log(LoginModel.username);
        console.log(LoginModel.password);

        axios.post(`http://localhost:4567/User/Register/`, { username: name, password: password })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        console.log("verzonden denk ik")
    }

    render() {

        try {
            return (
                <div className="App">
                    <div className="topnav">
                        <a href="#">Login</a>
                        <a href="#">Contact</a>
                        <a href="#">About</a>
                    </div>

                    <div className="content">
                        <div className="title1">BuddyFinder</div>
                        <div className="titletext"><center><p>Find buddies for your favorite activities!</p></center></div>
                        <div className="container" id="container1">
                            <center>
                                <div className="logintext">Login</div>
                                <input type="text" placeholder="Enter Username" name="uname" id="usernameBox" required></input>
                                <br></br>
                                <br></br>

                                <input type="password" placeholder="Enter Password" name="psw" id="passwordBox" required></input>
                                <br></br>
                                <br></br>
                                <button className="loginbutton" onClick={this.login}>Login</button>
                                <br></br>
                                <div className="text1">Don't have an account? Sign up now!</div>
                                <div className="button1" onClick={() => this.switch(true)}>Sign up</div>

                            </center>
                        </div>
                        <div className="container" id="container2">
                            <center>
                                <div><div className="backLink" onClick={() => this.switch(false)} > {"<back"} </div><div className="registertext">Sign up</div></div>
                                <input type="text" placeholder="Enter Username" name="uname" id="usernameBox" required></input>
                                <br></br>
                                <br></br>

                                <input type="password" placeholder="Enter Password" name="psw" id="regPasswordBox" required></input>
                                <br></br>
                                <br></br>
                                <input type="password" placeholder="Confirm Password" name="psw" id="regConfirmPasswordBox" required></input>
                                <br></br>
                                <br></br>
                                <button className="loginbutton" onClick={this.login}>Register</button>
                            </center>
                        </div>

                        {this.state && this.state.data &&
                            <div>{this.state.data}</div>
                        }

                    </div>

                    <div className="footer">
                        <div className="footertext">
                            <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                        </div>
                    </div>
                </div>
            )
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default App;