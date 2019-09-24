import React from 'react'
import {withRouter} from 'react-router-dom'

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
                    <div className="title1">Welcome! { this.props.location.state.user}</div>
                    <div className="container" id="container1">

                        <div className="logintext">Recent Matches</div>
                        <br></br>
                        <div className="text1">No matches found...</div>
                        <br></br>
                        <div className="button1" onClick= {this.redirect} >redirect</div>
                        <br></br>
                    </div>
                    <div float="left">
                        <div className="container" id="container2">
                            <center>
                                <div className="registertext">My Buddies</div>

                            </center>
                        </div>
                    </div>
                </div>

                <div className="footer">
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


export default withRouter(Home)