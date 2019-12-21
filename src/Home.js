import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Drawer from 'react-drag-drawer'

var loggedInUser;
class Home extends React.Component {

    constructor(props) {
        super(props)
        loggedInUser = JSON.parse(window.sessionStorage.loggedinuser);
        this.sendfindMatchRequest = this.sendfindMatchRequest.bind(this);
        this.sendGetMessageRequest = this.sendGetMessageRequest.bind(this);
        this.sendDeleteMessageRequest = this.sendDeleteMessageRequest.bind(this);
        this.sendMessageRequest = this.sendMessageRequest.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.loadMatches = this.loadMatches.bind(this);
        this.loadMessages = this.loadMessages.bind(this);
        this.toggle = this.toggle.bind(this);

        this.state = {
            matchVisible: false,
            newProfileVisible: false,
            message: null,
            messageid: null
        };
    }

    componentDidMount() {
        if (!loggedInUser.firstname) {
            this.setState({
                matchVisible: !this.state.matchVisible,
            });
        }
        else {
            this.setState({
                newProfileVisible: !this.state.newProfileVisible,
            });

            this.sendfindMatchRequest();
            this.sendGetBuddyRequest();
            this.sendGetMessageRequest();

        }
    }

    refresh = () => {
        window.location.reload();
    }

    redirectToNewProfile = () => {
        this.props.history.push({
            pathname: '/newprofile'
        })
    }

    redirectToProfile = (selectedUser) => {
        this.props.history.push({
            pathname: '/profile/' + selectedUser.username
        })
    }

    toggle = (type, value, message) => event => {

        this.setState({ message: message });
        
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
            this.setState({messageid: this.state.message.messageid})
            this.sendMessageRequest(message);
        }
    }

    sendfindMatchRequest() {

        axios.post(`http://localhost:4567/match/`, {
            userid: loggedInUser.userid, hobby1: loggedInUser.hobby1, hobby2: loggedInUser.hobby2,
            hobby3: loggedInUser.hobby3
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.data.length == 0) {

                }
                else {
                    this.setState({ matches: res.data });
                }
            })
    }

    sendGetMessageRequest() {

        axios.get(`http://localhost:4567/message`, { params: { id: loggedInUser.userid } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.data.length == 0) {

                }
                else {
                    this.setState({ messages: res.data });
                }
            })
    }

    sendDeleteMessageRequest(id) {

        axios.delete(`http://localhost:4567/message`, { params: { id: id } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Database Error!")
                }
                else {
                    this.refresh();
                }
            })
    }

    sendMessageRequest(message) {
        axios.post(`http://localhost:4567/message`, {
            reciever: this.state.message.sender, sender: loggedInUser,
            sendername: loggedInUser.username, message: message, isrequest: false
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Request error!")
                }
                else {
                    alert("The reply has been sent!");
                    this.toggle("regular", false, null);
                    this.sendDeleteMessageRequest(this.state.messageid)
                }
            })
    }

    sendGetBuddyRequest() {

        axios.get(`http://localhost:4567/buddy`, { params: { id: loggedInUser.userid } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.data.length == 0) {

                }
                else {
                    this.setState({ buddies: res.data });
                }
            })
    }

    sendAcceptRequest(id) {

        axios.post(`http://localhost:4567/buddy`, { userid: loggedInUser.userid, buddyid: id })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Database Error!")
                }
                else {
                    alert("Buddy request accepted!")
                    this.refresh();
                }
            })
    }

    loadMatches = (app) => {
        if (app.state.matches.length > 0) {
            return app.state.matches.map(function (each) {
                return (<div className="matchesbutton" onClick={() => app.redirectToProfile(each)}><div className="dot2"></div>{each.username}</div>)
            })
        }
    }

    loadBuddies = (app) => {
        if (app.state.buddies.length > 0) {
            return app.state.buddies.map(function (each) {
                return (<div className="matchesbutton" onClick={() => app.redirectToProfile(each)}><div className="dot2"></div>{each.firstname}
                    {""} {each.lastname} </div>)
            })
        }
    }

    loadMessages = (app) => {
        if (app.state.messages.length > 0) {
            return app.state.messages.map(function (each) {
                if (each.isrequest) {
                    return (
                        <div className="requestcontainer">
                            <div className="dot2"></div>
                            {each.sendername}
                            <br></br>
                            wants to be your buddy!
                            <br></br>
                            <div className="acceptbutton" onClick={() => app.sendAcceptRequest(each.sender.userid)}>Accept</div>
                            <div className="declinebutton" onClick={() => app.sendDeleteMessageRequest(each.messageid)}>Decline</div>
                        </div>
                    )
                }
                return (<div className="messagesbutton" onClick={app.toggle("regular", true, each)}><div className="dot2"></div>{each.sendername} sent you a message</div>)
            })
        }
    }

    render() {
        const { regular } = this.state

        return (
            <div className="App">
                <div className="topnav">
                    <a href="/">Logoff</a>
                    <a href="#">Account</a>
                    <a href="/contact">Contact</a>
                    <a href="#">About</a>
                    <div className="homebutton" onClick={this.refresh}>BuddyFinder</div>
                </div>

                <div className="content">
                    <div className="hometext">Welcome {loggedInUser.username}!</div>

                    <div>
                        <div className="homeblock" id="matchContainer" style={{ display: this.state.matchVisible ? 'none' : '', }}>

                            <div className="logintext">Recent Matches</div>
                            <br></br>
                            {this.state && this.state.matches &&

                                this.loadMatches(this)
                            }
                            <br></br>
                            <div className="button1" onClick={this.redirectToNewProfile} >redirect</div>
                            <br></br>
                        </div>
                        <div className="homeblock" id="buddyContainer" style={{ display: this.state.matchVisible ? 'none' : '', }}>

                            <div className="logintext">My Buddies</div>
                            <br></br>
                            {this.state && this.state.buddies &&

                                this.loadBuddies(this)
                            }

                        </div>
                        <div className="homeblock" id="messageContainer" style={{ display: this.state.matchVisible ? 'none' : '', }}>

                            <div className="logintext">Messages</div>
                            <br></br>
                            {this.state && this.state.messages &&

                                this.loadMessages(this)
                            }
                        </div>
                    </div>

                    <div className="container" id="newProfileContainer" ref={node => this.newProfileref = node} style={{ display: this.state.newProfileVisible ? 'none' : '', }}>

                        <div className="titletext">You need to create profile to use this site!</div>
                        <br></br>

                        <div className="getstartedbutton" onClick={this.redirectToNewProfile} >Get Started ></div>
                    </div>
                </div>
                {this.state && this.state.message &&
                    <Drawer
                        open={regular}
                        onRequestClose={this.toggle("regular", false, null)}
                    >
                       
                        <div className="messagecontainer">
                            <div className="logintext">Message from {this.state.message.sendername}</div>
                            <div className="text1">{this.state.message.message}</div>
                            <br></br>
                            <b><div className="text1">Reply:</div></b>
                            <textarea placeholder="Write message" id="messageBox"></textarea>
                            <br></br>
                            <button className="loginbutton" onClick={this.sendMessage}>Send</button>
                        </div>
                    </Drawer>
                }



                <footer>
                    <div className="footertext">
                        <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                    </div>
                </footer>
            </div>
        )
    }
    catch(err) {
        console.log(err);
    }
}

export default Home