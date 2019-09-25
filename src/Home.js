import React from 'react'

var loggedInUser;

class Home extends React.Component {

    constructor(props) {
        super(props)
        loggedInUser = props.location.state.loggedInUser;
    }

    componentDidMount() {
        if(!loggedInUser.firstname)
        {
            document.getElementById("matchContainer").style.display = 'none';
            document.getElementById("buddyContainer").style.display = 'none';
        }
        else{
            return true;
        }
    }

    redirect = () => {

        this.props.history.push({
            pathname: '/newprofile',
            state: { loggedInUser }
        })

    }

    render() {
        return (
            <div className="App">
                <div className="topnav">
                    <a href="/">Logoff</a>
                    <a href="#">Account</a>
                    <a href="/contact">Contact</a>
                    <a href="#">About</a>
                </div>

                <div className="content">
                    <div className="hometext">Welcome {loggedInUser.username}!</div>

                    
                    <div>
                        <div className="homeMatchContainer" id="matchContainer">

                            <div className="logintext">Recent Matches</div>
                            <br></br>
                            <div className="text1">No matches found...</div>
                            <br></br>
                            <div className="button1" onClick={this.redirect} >redirect</div>
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
                            
                            <div className="getstartedbutton" onClick={this.redirect} >Get Started ></div>
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