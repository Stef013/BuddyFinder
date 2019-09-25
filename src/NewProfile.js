import React from 'react'

var loggedInUser;

class NewProfile extends React.Component {

    constructor(props) {
        super(props)
        loggedInUser = props.location.state.loggedInUser;
    }

    redirect = () => {
        this.props.history.push('/contact')
    }

    newProfile() {
        var fname = document.getElementById("firstnameBox").value;
        var lname = document.getElementById("lastnamebox").value;
        var country = document.getElementById("countryBox").value;
        var city = document.getElementById("cityBox").value;
        console.log("in profile methode");
        console.log(fname);
        console.log(lname);
        console.log(country);
        console.log(city);


        /*if (!uname || !pword || !cpword) {
            alert("Sign Up fields cannot be empty!")
        }
        else {
            if (pword != cpword) {
                alert("Passwords do not match!")
            }
            else {
                this.sendSignUpRequest(uname, pword);
            }
        }*/
        this.sendNewProfileRequest(fname, lname, country,city)
    }

    sendNewProfileRequest(fname, lname, cntry, cty) {

        axios.post(`http://localhost:4567/User/Update/`, { firstname: fname, lastname: lname, country: cntry, city: cty  })
            .then(res => {
                console.log(res);
                console.log(res.data);
                if (res.data) {
                    alert("Account has been created!")
                }
                else {
                    alert("Username is already taken")
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
                </div>

                <div className="content">
                    <div className="hometext">Profile Set-up</div>
                    <center>
                        <div className="profileContainer" id="profileContainer">
                            <div className="dot">Upload picture</div>
                            <br></br>
                            <div className="text1" margin-bottom="30px">{loggedInUser.username}</div>
                            <br></br>
                            <br></br>
                            <input type="text" placeholder="First name" name="fname" id="firstnameBox" required></input>
                            <input type="text" placeholder="Last name" name="lname" id="lastnameBox" required></input>
                            <br></br>
                            <input type="text" placeholder="Country" name="country" id="countryBox" required></input>
                            <input type="text" placeholder="City" name="city" id="cityBox" required></input>
                            <br></br>
                            <br></br>
                            <input type="text" placeholder="Hobby1" name="hobby1" id="hobby1Box" required></input>
                            <input type="text" placeholder="Hobby2 (Optional)" name="hobby2" id="hobby2Box" required></input>
                            <br></br>
                            <input type="text" placeholder="Hobby3 (Optional)" name="hobby3" id="hobby3Box" required></input>
                            <br></br>
                            <div className="loginbutton" onClick={this.redirect}> Save</div>
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