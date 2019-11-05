import React from 'react'
import axios from 'axios'


class Profile extends React.Component {

    state = {
        profileUser: null,
        loggedInUser: null
    }

    constructor(props) {
        super(props)
        this.setState(() => ({ loggedInUser: props.location.state.loggedInUser }));
        this.sendGetProfileRequest = this.sendGetProfileRequest.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.match.params;
        console.log(id);
        this.sendGetProfileRequest(id);
    }

    sendGetProfileRequest(id) {

        axios.get(`http://localhost:4567/Profile`, { params: { id: id } })
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

    redirect = () => {
        this.props.history.push({
            pathname: '/home',
            state: { loggedInUser: this.state.loggedInUser }
        })
    }

    render() {

        if (!this.state.profileUser) {
            return <div>Loading...</div>
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
                            <div className="text1"><b>Description:</b>
                                <p> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>
                            </div>
                            <br></br>
                            <b><div className="text1">Hobby's:</div></b>
                            <div className="hobbytext">{this.state.profileUser.hobby1}</div>
                            <div className="hobbytext">{this.state.profileUser.hobby2}</div>
                            <div className="hobbytext">{this.state.profileUser.hobby3}</div>
                            <br></br>
                            <div className="button1" style={{ float: "right" }}>+ Buddy</div>
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