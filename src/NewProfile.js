import React from 'react'
import axios from 'axios'

const URL =  "https://6d4bfe3f.ngrok.io";

class NewProfile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loggedInUser: null,
            trigger: null
        };

        this.newProfile = this.newProfile.bind(this)
        this.sendNewProfileRequest = this.sendNewProfileRequest.bind(this)
    }

    componentDidMount() {
        //checkt of gebruiker ingelogd is
        if (!window.sessionStorage.loggedinuser) {
            this.props.history.push({
                pathname: '/'
            })
        }
        else {
            this.setState({loggedInUser: JSON.parse(window.sessionStorage.loggedinuser)});
        }
    }

    redirect = () => {
        this.props.history.push({
            pathname: '/home'
        })
    }

    newProfile() {
        var fname = document.getElementById("firstnameBox").value;
        var lname = document.getElementById("lastnameBox").value;
        var country = document.getElementById("countryBox").value;
        var city = document.getElementById("cityBox").value;
        var description = document.getElementById("aboutmeBox").value;
        var hobby1 = document.getElementById("hobby1Box").value;
        var hobby2 = document.getElementById("hobby2Box").value;
        var hobby3 = document.getElementById("hobby3Box").value;

        if (!fname || !lname || !country || !city || !hobby1) {
            alert("fields cannot be empty!")
        }
        else {
            this.sendNewProfileRequest(fname, lname, country, city, description, hobby1, hobby2, hobby3)
        }
    }

    sendNewProfileRequest(fname, lname, cntry, cty, desc, hob1, hob2, hob3) {

        axios.put(URL + "/user", {
            userid: this.state.loggedInUser.userid, username: this.state.loggedInUser.username,
            password: this.state.loggedInUser.password, firstname: fname, lastname: lname, country: cntry, city: cty, description: desc, hobby1: hob1,
            hobby2: hob2, hobby3: hob3
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data) {
                    alert("Profile has been set up!")
                    this.setState({
                        updatedUser: {
                            userid: this.state.loggedInUser.userid,
                            username: this.state.loggedInUser.username,
                            firstname: fname,
                            lastname: lname,
                            country: cntry,
                            city: cty,
                            description: desc,
                            hobby1: hob1,
                            hobby2: hob2,
                            hobby3: hob3,
                        }
                    })

                    window.sessionStorage.setItem("loggedinuser", JSON.stringify(this.state.updatedUser));
                    this.redirect();
                }
                else {
                    alert("Request Error!")
                }
            })
    }

    render() {

        if (!this.state.loggedInUser) {
            return <div className="loadingtext">Loading...</div>
        }

        return (
            <div className="App">
                <div className="topnav">
                    <a href="/">Logoff</a>
                    <a href="/newprofile">Account</a>
                    <div className="homebutton" onClick={this.redirect}>BuddyFinder</div>
                </div>

                <div className="content">
                    <div className="hometext">Profile Set-up</div>
                    <center>
                        <div className="newprofilecontainer" id="newprofileContainer">
                            <div className="dot">Upload picture</div>
                            <br></br>
                            <div className="text1" margin-bottom="30px">{this.state.loggedInUser.username}</div>

                            <br></br>
                            <input type="text" placeholder="First name" name="fname" id="firstnameBox" required></input>
                            <input type="text" placeholder="Last name" name="lname" id="lastnameBox" required></input>
                            <br></br>
                            <input type="text" placeholder="Country" name="country" id="countryBox" required></input>
                            <input type="text" placeholder="City" name="city" id="cityBox" required></input>
                            <br></br>
                            <textarea placeholder="About me:" id="aboutmeBox"></textarea>
                            <input type="text" placeholder="Hobby1" name="hobby1" id="hobby1Box" required></input>
                            <input type="text" placeholder="Hobby2 (Optional)" name="hobby2" id="hobby2Box" required></input>
                            <br></br>
                            <input type="text" placeholder="Hobby3 (Optional)" name="hobby3" id="hobby3Box" required></input>
                            <br></br>
                            <div className="loginbutton" onClick={this.newProfile}> Save</div>
                            <br></br>
                        </div>
                    </center>
                </div>

                <div className="footer2">
                    <div className="footertext">
                        <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewProfile