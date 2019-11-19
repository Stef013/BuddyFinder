import React from 'react'
import axios from 'axios'

var loggedInUser;

class NewProfile extends React.Component {

    constructor(props) {
        super(props)
        loggedInUser = JSON.parse(window.sessionStorage.loggedinuser);
        this.newProfile = this.newProfile.bind(this)
        this.sendNewProfileRequest = this.sendNewProfileRequest.bind(this)
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

        axios.put(`http://localhost:4567/user`, {
            userid: loggedInUser.userid, username: loggedInUser.username,
            password: loggedInUser.password, firstname: fname, lastname: lname, country: cntry, city: cty, description: desc, hobby1: hob1,
            hobby2: hob2, hobby3: hob3
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data) {
                    alert("Profile has been set up!")
                    loggedInUser.firstname = fname;
                    loggedInUser.lastname = lname;
                    loggedInUser.country = cntry;
                    loggedInUser.city = cty;
                    loggedInUser.description = desc;
                    loggedInUser.hobby1 = hob1;
                    loggedInUser.hobby2 = hob2;
                    loggedInUser.hobby3 = hob3;

                    window.sessionStorage.setItem("loggedinuser", JSON.stringify(loggedInUser));
                    this.redirect();
                }
                else {
                    alert("Request Error!")
                }
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
                    <div className="hometext">Profile Set-up</div>
                    <center>
                        <div className="newprofilecontainer" id="newprofileContainer">
                            <div className="dot">Upload picture</div>
                            <br></br>
                            <div className="text1" margin-bottom="30px">{loggedInUser.username}</div>

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
    catch(err) {
        console.log(err);
    }
}

export default NewProfile