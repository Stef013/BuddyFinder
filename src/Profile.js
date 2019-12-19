import React from 'react'
import axios from 'axios'
import MessageDrawer from './MessageDrawer';
import Drawer from 'react-drag-drawer'

var loggedInUser;

class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            profileUser: null,
            regular: false,
            isBuddy: null
        }

        loggedInUser = JSON.parse(window.sessionStorage.loggedinuser);
        this.sendGetProfileRequest = this.sendGetProfileRequest.bind(this);
        this.sendBuddyRequest = this.sendBuddyRequest.bind(this);
        this.sendMessageRequest = this.sendMessageRequest.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        this.sendGetProfileRequest(id);
    }

    toggle = (type, value) => event => {
        this.setState(state => {
            return {
                [type]: value
            };
        });
    };

    sendMessage() {
        var message = document.getElementById("messageBox").value;
        if (!message) {
            alert("Message cannot be empty!")
        }
        else {
            this.sendMessageRequest(message);
        }
    }

    sendGetProfileRequest(id) {

        axios.get(`http://localhost:4567/user`, { params: { id: id } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("No profile found!")
                }
                else {
                    this.setState({ profileUser: res.data })
                    this.sendCheckBuddyRequest();
                }
            })
    }

    sendCheckBuddyRequest() {
        axios.get(`http://localhost:4567/buddy/check`, { params: { userid: loggedInUser.userid, profileid: this.state.profileUser.userid } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    this.setState({isBuddy: "inline-block"});
                }
                else {
                    this.setState({isBuddy: "none"})
                }
            })
    }

    sendBuddyRequest() {
        axios.post(`http://localhost:4567/message`, {
            reciever: this.state.profileUser, sender: loggedInUser,
            sendername: loggedInUser.username, message: null, isrequest: true
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Request error!")
                }
                else {
                    alert("Request has been sent!")
                }
            })
    }

    sendMessageRequest(message) {
        axios.post(`http://localhost:4567/message`, {
            reciever: this.state.profileUser, sender: loggedInUser,
            sendername: loggedInUser.username, message: message, isrequest: false
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Request error!")
                }
                else {
                    alert("The message has been sent!");
                    this.toggle("regular", true);
                }
            })
    }

    

    redirect = () => {
        this.props.history.push({
            pathname: '/home'
        })
    }

    render() {
        const { regular } = this.state

        if (!this.state.isBuddy) {
            return <div className="loadingtext">Loading...</div>
        }

        return (
            <div className="App">
                <div className="topnav">
                    <a href="/">Logoff</a>
                    <a href="#">Account</a>
                    <a href="/contact">Contact</a>
                    <a href="#">About</a>
                    <div className="homebutton" onClick={this.redirect}>BuddyFinder</div>
                </div>

                <div className="content">
                    <div className="profilecontainer">
                        <center>
                            <div className="dot3"></div>
                            <div className="profilenametext">{this.state.profileUser.username}</div>
                            <div className="text2">{this.state.profileUser.city}, {this.state.profileUser.country} </div>
                            <br></br>
                            <div>
                            <div className="acceptbutton" id="addbuddyButton" onClick={this.sendBuddyRequest} style={{display: this.state.isBuddy}}>+ Buddy</div>
                            <div className="button1" onClick={this.toggle("regular", true)}>Message</div>
                            </div>
                            <br></br>
                            <div className="text1"><b>About me:</b>
                                <p>{this.state.profileUser.description}</p>
                            </div>
                            <br></br>
                            <b><div className="text1">Hobby's:</div></b>
                            <div className="hobbytext">{this.state.profileUser.hobby1}</div>
                            <div className="hobbytext">{this.state.profileUser.hobby2}</div>
                            <div className="hobbytext">{this.state.profileUser.hobby3}</div>
                            <br></br>
                            <br></br>
                            
                        </center>
                    </div>
                    <Drawer
                        open={regular}
                        onRequestClose={this.toggle("regular", false)}
                    >
                        <div className="messagecontainer">
                                <div className="logintext">Send message to {this.state.profileUser.username}</div>
                                <textarea placeholder="Write message" id="messageBox"></textarea>
                                <br></br>
                                <button className="loginbutton" onClick={this.sendMessage}>Send</button>
                        </div>
                    </Drawer>

                    <footer>
                        <div className="footertext">
                            <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Profile;