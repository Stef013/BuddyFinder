import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

var loggedInUser;
var matches;
class Home extends React.Component {

    constructor(props) {
        super(props)
        loggedInUser = JSON.parse(window.sessionStorage.loggedinuser);
        this.sendfindMatchRequest = this.sendfindMatchRequest.bind(this);
        this.sendGetMessageRequest = this.sendGetMessageRequest.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.loadMatches = this.loadMatches.bind(this);
        this.loadMessages = this.loadMessages.bind(this);

        this.state = {
            matchVisible: false,
            newProfileVisible: false,
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
            this.sendGetMessageRequest();

        }
    }

    refresh = () => {
        this.props.history.push({
            pathname: '/home'
        })
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

    loadMatches = (app) => {
        if (app.state.matches.length > 0) {
            return app.state.matches.map(function (each) {
                return (<div className="matchesbutton" onClick={() => app.redirectToProfile(each)}><div className="dot2"></div>{each.username}</div>)
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
                            {each.senderid}
                            <br></br> 
                            wants to be your buddy!
                            <br></br>
                            <div className="acceptbutton">Accept</div><div className="declinebutton">Decline</div>
                        </div>
                    )
                }
                return (<div className="message"><div className="dot2"></div>{each.senderid} sent you a message</div>)
            })
        }
    }

    render() {
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
                            <div className="text1">You have no buddies yet.</div>
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