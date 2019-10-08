import React from 'react'

var profileUser;
var loggedInUser;

class Profile extends React.Component {

    constructor(props) {
        super(props)
        loggedInUser = props.location.state.loggedInUser;
        
    }

    redirect = () => {
        this.props.history.push({
            pathname: '/home',
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
                    <div className="homebutton" onClick={this.redirect}>BuddyFinder</div>
                </div>

                <div className="content">
                    <div className="hometext">Profile of [Insert User]</div>

                    

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
