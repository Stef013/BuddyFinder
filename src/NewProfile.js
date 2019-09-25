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
                            <input type="text" placeholder="First name" name="uname" id="usernameBox" required></input>
                            <input type="text" placeholder="Last name" name="uname" id="usernameBox" required></input>
                            <br></br>
                            <input type="text" placeholder="Country" name="uname" id="usernameBox" required></input>
                            <input type="text" placeholder="City" name="uname" id="usernameBox" required></input>
                            <br></br>
                            <br></br>
                            <input type="text" placeholder="Hobby1" name="uname" id="usernameBox" required></input>
                            <input type="text" placeholder="Hobby2 (Optional)" name="uname" id="usernameBox" required></input>
                            <br></br>
                            <input type="text" placeholder="Hobby3 (Optional)" name="uname" id="usernameBox" required></input>
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