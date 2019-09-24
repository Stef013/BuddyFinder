import React from 'react'

class Home extends React.Component {

    redirect = () => {

        this.props.history.push('/contact')

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
                    <div className="hometext">Welcome {this.props.location.state.loggedInUser.username}!</div>
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