import React from 'react'
import axios from 'axios'
import Drawer from 'react-drag-drawer'

const URL =  "https://2059667b.ngrok.io"

class Home extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedInUser: null,
            matchVisible: false,
            newProfileVisible: false,
            message: null,
            messageid: null
        };
        
        this.sendfindMatchRequest = this.sendfindMatchRequest.bind(this);
        this.sendGetMessageRequest = this.sendGetMessageRequest.bind(this);
        this.sendDeleteMessageRequest = this.sendDeleteMessageRequest.bind(this);
        this.sendMessageRequest = this.sendMessageRequest.bind(this);
        this.sendMessage = this.sendMessage.bind(this);        
    }  

    async componentDidMount() {
        //checkt of gebruiker ingelogd is
        if(!window.sessionStorage.loggedinuser)
        {
            this.props.history.push({
                pathname: '/'
            })
        }
        else{
            await this.setState({loggedInUser: JSON.parse(window.sessionStorage.loggedinuser)});
            
            if (!this.state.loggedInUser.firstname) {
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
            this.setState({ messageid: this.state.message.messageid })
            this.sendMessageRequest(message);
        }
    }

    sendfindMatchRequest() {
        axios.post(URL + "/match/", {
            userid: this.state.loggedInUser.userid, hobby1: this.state.loggedInUser.hobby1, hobby2: this.state.loggedInUser.hobby2,
            hobby3: this.state.loggedInUser.hobby3
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.data.length > 0) {
                    this.setState({ matches: res.data });
                }
            })
    }

    sendGetMessageRequest() {

        axios.get(URL + "/message", { params: { id: this.state.loggedInUser.userid } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.data.length > 0) {
                    this.setState({ messages: res.data });
                }
            })
    }

    sendDeleteMessageRequest(id) {

        axios.delete(URL + "/message", { params: { id: id } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Database Error!")
                }
                else {
                    this.toggle("regular", false, null);
                    this.refresh();
                }
            })
    }

    sendMessageRequest(message) {
        axios.post(URL + "/message", {
            reciever: this.state.message.sender, sender: this.state.loggedInUser,
            sendername: this.state.loggedInUser.username, message: message, isrequest: false
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Request error!")
                }
                else {
                    this.toggle("regular", false, null);
                    alert("The reply has been sent!");
                    this.sendDeleteMessageRequest(this.state.messageid)
                }
            })
    }

    sendGetBuddyRequest() {
        axios.get(URL + "/buddy", { params: { id: this.state.loggedInUser.userid } })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (res.data.length > 0) {
                    this.setState({ buddies: res.data });
                }
            })
    }

    sendAcceptRequest(buddyid, messageid) {
        axios.post(URL + "/buddy", { userid: this.state.loggedInUser.userid, buddyid: buddyid, messageid: messageid })
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
                            <div className="acceptbutton" onClick={() => app.sendAcceptRequest(each.sender.userid, each.messageid)}>Accept</div>
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

        if (!this.state.loggedInUser) {
            return <div className="loadingtext">Loading...</div>
        }

        return (
            <div className="App">
                <div className="topnav">
                    <a href="/">Logoff</a>
                    <a href="/newprofile">Account</a>
                    <div className="homebutton" onClick={this.refresh}>BuddyFinder</div>
                </div>

                <div className="content">
                    <div className="hometext">Welcome {this.state.loggedInUser.username}!</div>

                    <div>
                        <div className="homeblock" id="matchContainer" style={{ display: this.state.matchVisible ? 'none' : 'block', }}>

                            <div className="logintext">Recent Matches</div>
                            <br></br>
                            {this.state.matches &&

                                this.loadMatches(this)
                            }
                        </div>
                        <div className="homeblock" id="buddyContainer" style={{ display: this.state.matchVisible ? 'none' : 'block', }}>

                            <div className="logintext">My Buddies</div>
                            <br></br>
                            {this.state.buddies &&

                                this.loadBuddies(this)
                            }

                        </div>
                        <div className="homeblock" id="messageContainer" style={{ display: this.state.matchVisible ? 'none' : 'block', }}>

                            <div className="logintext">Messages</div>
                            <br></br>
                            {this.state.messages &&

                                this.loadMessages(this)
                            }
                        </div>
                    </div>

                    <div className="container" id="newProfileContainer" ref={node => this.newProfileref = node} style={{ display: this.state.newProfileVisible ? 'none' : '', }}>

                        <div className="titletext">You need to create a profile to use this site!</div>
                        <br></br>

                        <div className="getstartedbutton" onClick={this.redirectToNewProfile} >Get Started ></div>
                    </div>
                </div>
                {this.state.message &&
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
                            <div className="button1" onClick={this.sendMessage}>Send</div>
                            <div className="deletebutton" onClick={() => this.sendDeleteMessageRequest(this.state.message.messageid)}>Delete</div>
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
}

export default Home