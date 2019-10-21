import React from 'react'
import axios from 'axios'

var loggedInUser;
var matches;
class Home extends React.Component {

    constructor(props) {
        super(props)
        loggedInUser = props.location.state.loggedInUser;
        this.sendfindMatchRequest = this.sendfindMatchRequest.bind(this);
        this.redirectToProfile = this.redirectToProfile.bind(this);
        this.loadMatches = this.loadMatches.bind(this);
        console.log(loggedInUser.firstname);
    }

    hideContainer() {
        if (!loggedInUser.firstname) {
            document.getElementById("matchContainer").style.display = 'none';
            document.getElementById("buddyContainer").style.display = 'none';
        }
        else {
            document.getElementById("newProfileContainer").style.display = 'none';
            this.sendfindMatchRequest();
        }
    }

    refresh = () => {
        this.props.history.push({
            pathname: '/home',
            state: { loggedInUser }
        })
    }

    redirectToNewProfile = () => {
        this.props.history.push({
            pathname: '/newprofile',
            state: { loggedInUser }
        })
    }

    redirectToProfile = () => {
        this.props.history.push({
            pathname: '/profile',
            state: { loggedInUser }
        })
    }

    sendfindMatchRequest() {

        axios.post(`http://localhost:4567/Match/`, {
            userid: loggedInUser.userid, hobby1: loggedInUser.hobby1, hobby2: loggedInUser.hobby2,
            hobby3: loggedInUser.hobby3
        })
            .then(res => {
                console.log(res);
                console.log(res.data);

                if (!res.data) {
                    alert("Werkt nie")
                }
                else {
                    console.log(res.data[0].firstname);
                    this.setState({ matches: res.data });
                }
            })
    }

    loadMatches = (app) => {
        if (app.state.matches.length > 0) {
            return app.state.matches.map(function (each) {
                return (<div className="matchesbutton" onClick={app.redirectToProfile}><div className="dot2"></div>{each.username}</div>)
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
                        <div className="homeMatchContainer" id="matchContainer">

                            <div className="logintext">Recent Matches</div>
                            <br></br>
                            {this.state && this.state.matches &&
                                
                                this.loadMatches(this)
                            }
                            <br></br>
                            <div className="button1" onClick={this.redirectToNewProfile} >redirect</div>
                            <br></br>
                        </div>
                        <div className="homeBuddyContainer" id="buddyContainer">

                            <div className="logintext">My Buddies</div>
                            <br></br>
                            <div className="text1">You have no buddies yet.</div>
                        </div>
                    </div>

                    <div className="container" id="newProfileContainer">

                        <div className="titletext">You need to create profile to use this site!</div>
                        <br></br>

                        <div className="getstartedbutton" onClick={this.redirectToNewProfile} >Get Started ></div>
                    </div>
                </div>

                {this.hideContainer}

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