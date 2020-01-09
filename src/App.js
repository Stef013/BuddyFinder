import React, { Component } from 'react'
import axios from 'axios';

class App extends Component {

    constructor() {
        super()

        this.state = {
            loggedInUser: null,
            loginVisible: true,
            registerVisible: false
        }

        window.sessionStorage.removeItem("loggedinuser");
        this.sendLoginRequest = this.sendLoginRequest.bind(this);
        this.sendSignUpRequest = this.sendSignUpRequest.bind(this);
        this.login = this.login.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    redirectToHome = () => {
        this.props.history.push({
            pathname: '/home'
        })
    }

    switchContainers() {
        this.setState({
            loginVisible: !this.state.loginVisible,
            registerVisible: !this.state.registerVisible
        });
    }

    login() {
        var uname = document.getElementById("usernameBox").value;
        var pword = document.getElementById("passwordBox").value;

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
        axios.post(`http://localhost:4567/user/login/`, { username: name, password: password })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Wrong username or password.")
                }
                else {
                    this.setState(() => ({ loggedInUser: res.data }));
                    window.sessionStorage.setItem("loggedinuser", JSON.stringify(this.state.loggedInUser));
                    window.sessionStorage.setItem("isloggedin", "true");
                    this.redirectToHome();
                }
            })
    }

    sendSignUpRequest(name, password) {
        axios.post(`http://localhost:4567/user`, { username: name, password: password })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.data) {
                    alert("Account has been created!")
                    window.location.reload();
                }
                else {
                    alert("Username is already taken")
                }
            })
    }

    render() {
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
                    <div className="container" id="loginContainer" style={{ display: this.state.loginVisible ? 'block' : 'none', }}>
                        <center>
                            <div className="logintext">Login</div>
                            <input type="text" placeholder="Enter Username" name="uname" id="usernameBox" required></input>
                            <br></br>

                            <input type="password" placeholder="Enter Password" name="psw" id="passwordBox" required></input>
                            <br></br>
                            <button className="loginbutton" onClick={this.login}>Login</button>
                            <br></br>
                            <div className="text1">Don't have an account? Sign up now!</div>
                            <div className="button1" onClick={() => this.switchContainers()}>Sign up</div>
                        </center>
                    </div>
                    <div className="container" id="registerContainer" style={{ display: this.state.registerVisible ? 'block' : 'none', }}>
                        <center>
                            <div><div className="backLink" onClick={() => this.switchContainers()} > {"<back"} </div><div className="registertext">Sign up</div></div>
                            <input type="text" placeholder="Enter Username" name="uname" id="suUsernameBox" required></input>
                            <br></br>

                            <input type="password" placeholder="Enter Password" name="psw" id="suPasswordBox" required></input>
                            <br></br>
                            <input type="password" placeholder="Confirm Password" name="psw" id="suConfirmPasswordBox" required></input>
                            <br></br>
                            <button className="loginbutton" onClick={this.signUp}>Register</button>
                        </center>
                    </div>
                </div>

                <footer>
                    <div className="footertext">
                        <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                    </div>
                </footer>
            </div>
        )
    }
}

export default App;