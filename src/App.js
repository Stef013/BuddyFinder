import React, { Component } from 'react'
import axios from 'axios';

// Global variables

var loggedInUser = {
    userid: null,
    username: null,
    password: null,
    firstname: null,
    lastname: null,
    city: null,
    country: null,
    description: null,
    hobby1: null,
    hobby2: null,
    hobby3: null
}

class App extends Component {

    constructor() {
        super()
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
        this.sendSignUpRequest = this.sendSignUpRequest.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    componentDidMount() {
        document.getElementById("container2").style.display = 'none';
        //this.getData()
    }

    redirectToHome = () => {

        this.props.history.push({
            pathname: '/home',
            state: { loggedInUser }
        })
    }

    /*getData() {
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
    }*/

    switch(bool) {
        if (bool) {
            document.getElementById("container1").style.display = 'none';
            document.getElementById("container2").style.display = 'block';
        }
        else {
            document.getElementById("container1").style.display = 'block';
            document.getElementById("container2").style.display = 'none';
        }
    }

    login() {
        var uname = document.getElementById("usernameBox").value;
        var pword = document.getElementById("passwordBox").value;
        console.log("in login methode");
        console.log(uname);
        console.log(pword);

        if (!uname || !pword) {
            alert("Login fields cannot be empty!")
        }
        else {
            this.sendLoginRequest(uname, pword);
        }
    }

    signUp() {
        var uname = document.getElementById("suUsernameBox").value;
        var pword = document.getElementById("suPasswordBox").value;
        var cpword = document.getElementById("suConfirmPasswordBox").value;
        console.log("in SignUp methode");
        console.log(uname);
        console.log(pword);

        if (!uname || !pword || !cpword) {
            alert("Sign Up fields cannot be empty!")
        }
        else {
            if (pword !== cpword) {
                alert("Passwords do not match!")
            }
            else {
                this.sendSignUpRequest(uname, pword);
            }
        }
    }

    sendLoginRequest(name, password) {

        axios.post(`http://localhost:4567/User/Login/`, { username: name, password: password })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Wrong username or password.")
                }
                else {
                    loggedInUser.userid = res.data.userid;
                    loggedInUser.username = res.data.username;
                    loggedInUser.password = res.data.password;
                    loggedInUser.firstname = res.data.firstname;
                    loggedInUser.lastname = res.data.lastname;
                    loggedInUser.country = res.data.country;
                    loggedInUser.city = res.data.city;
                    loggedInUser.hobby1 = res.data.hobby1;
                    loggedInUser.hobby2 = res.data.hobby2;
                    loggedInUser.hobby3 = res.data.hobby3;
                    console.log(loggedInUser);
                    this.redirectToHome();
                }
            })
    }

    sendSignUpRequest(name, password) {

        axios.post(`http://localhost:4567/User/SignUp/`, { username: name, password: password })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data) {
                    alert("Account has been created!")
                }
                else {
                    alert("Username is already taken")
                }
            })
    }

    render() {

        try {
            return (
                <div className="App">
                    <div className="topnav">
                        <a href="/">Login</a>
                        <a href="/contact">Contact</a>
                        <a href="#">About</a>
                        <div className="homebutton" onClick={this.refresh}>BuddyFinder</div>
                    </div>

                    <div className="content">
                        <div className="title1">BuddyFinder</div>
                        <div className="titletext"><center><p>Find buddies for your favorite activities!</p></center></div>
                        <div className="container" id="container1">
                            <center>
                                <div className="logintext">Login</div>
                                <input type="text" placeholder="Enter Username" name="uname" id="usernameBox" required></input>
                                <br></br>

                                <input type="password" placeholder="Enter Password" name="psw" id="passwordBox" required></input>
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
                                <input type="text" placeholder="Enter Username" name="uname" id="suUsernameBox" required></input>
                                <br></br>

                                <input type="password" placeholder="Enter Password" name="psw" id="suPasswordBox" required></input>
                                <br></br>
                                <input type="password" placeholder="Confirm Password" name="psw" id="suConfirmPasswordBox" required></input>
                                <br></br>
                                <button className="loginbutton" onClick={this.signUp}>Register</button>
                            </center>
                        </div>

                        {this.state && this.state.data &&
                            <div>{this.state.data}</div>
                        }

                    </div>

                    <footer>
                        <div className="footertext">
                            <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                        </div>
                    </footer>
                </div>
            )
        }
        catch (err) {
            console.log(err);
        }
    }
}

export default App;