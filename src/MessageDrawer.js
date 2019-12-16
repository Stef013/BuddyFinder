import React, { Component } from "react";
import axios from 'axios'
import Drawer from 'react-drag-drawer'

class MessageDrawer extends Component{
    toggle = () => {
        let { toggle } = this.state
       
        this.setState({ toggle: !toggle })
      }
       
      render () {
        const { open } = this.state
       
        return (
          <Drawer
            open={open}
            onRequestClose={this.toggle}
          >
            <div>Hey Im inside the drawer!</div>
          </Drawer>
        )
      }
}

export default MessageDrawer;