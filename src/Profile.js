import React from 'react'
import axios from 'axios'

var loggedInUser;

class Profile extends React.Component {

    

    constructor(props) {
        super(props)
        
        this.state = {
            profileUser: null
        }
        
        loggedInUser = JSON.parse(window.sessionStorage.loggedinuser);
        console.log(loggedInUser.userid);
        
        this.sendGetProfileRequest = this.sendGetProfileRequest.bind(this);
        this.sendBuddyRequest = this.sendBuddyRequest.bind(this);
    }

    componentWillMount() {
        
        const { id } = this.props.match.params;
        this.sendGetProfileRequest(id);
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
                }
            })
    }

    sendBuddyRequest() {

        axios.post(`http://localhost:4567/message`, { recieverid: this.state.profileUser.userid, senderid: loggedInUser.userid, 
        sendername: this.state.profileUser.username, message: null, isrequest: true  })
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

    redirect = () => {
        this.props.history.push({
            pathname: '/home'
        })
    }

    render() {

        if (!this.state.profileUser) {
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
                            <div className="button1" onClick={this.sendBuddyRequest}>+ Buddy</div>
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
                            
                        </center>
                    </div>

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