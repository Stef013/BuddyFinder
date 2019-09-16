import React, { Component } from 'react'

var hoppa = "jema";

/*function Welcome(props) {
     // create a new XMLHttpRequest
     var xhr = new XMLHttpRequest()
     // get a callback when the server responds
     xhr.addEventListener('load', () => {
       // update the state of the component with the result here
       hoppa = xhr.responseText;
      // this.setState({ name: name });
       console.log(hoppa)  
       return <h1>{props.name}</h1>;
     })
     // open the request with the verb and the url
     xhr.open('GET', 'http://localhost:4567/User/GetTest')
     // send the request
     xhr.send()

     return "kale moeder";

  }

  const element = <Welcome name="Sara" />;*/

class App extends Component {

    constructor() {
        super()
    }

    componentDidMount() {
      this.getData()
    }
    
    getData() {
        // create a new XMLHttpRequest
        var xhr = new XMLHttpRequest()
        // get a callback when the server responds
        xhr.addEventListener('load', () => {
          // update the state of the component with the result here
         // this.state.data = xhr.responseText;

          const self = this;
          self.setState({ data: xhr.responseText });
         // this.setState({ name: name });
          console.log(this.state.data)
        })
        // open the request with the verb and the url
        xhr.open('GET', 'http://localhost:4567/User/GetTest')
        // send the request
        xhr.send()
      }

      
    render() {
        
        var data2 = "datadinges";
        try{
        return (
            <div className="App">
                <div className="topnav">
                    <a href="#">Login</a>
                    <a href="#">Contact</a>
                    <a href="#">About</a>
                </div>

                <div className="content">
                    <div className="title1">BuddyFinder</div>
                    <p>{data2 = "Dikkertje"}</p>

                    <div className="titletext"><center><p>Find buddies for your favorite activities!</p></center></div>
                    <div className="button1">Get Started ></div>

                    { this.state && this.state.data &&
                        <div>{this.state.data}</div>
                    }
                    
                </div>

                <div className="footer">
                    <div className="footertext">
                        <p>Created by Stefan Vujinovic - Official licenced product by Microsoft</p>
                    </div>
                </div>
            </div>
        )
        }
        catch(err)
        {
            console.log(err);
        }
    }
}

export default App;