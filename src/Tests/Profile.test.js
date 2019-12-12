import React from 'react';
import { shallow } from 'enzyme';
import Profile from '../Profile';

var loggedInUser = {
   userid: "1",
   username: "loggedinuser",
   password: "test123",
   firstname: "testertje",
   lastname: null,
   city: null,
   country: null,
   description: null,
   hobby1: null,
   hobby2: null,
   hobby3: null
}

var selectedUser = {
   userid: "2",
   username: "selecteduser",
   password: "test123",
   firstname: "testname",
   lastname: null,
   city: null,
   country: null,
   description: null,
   hobby1: null,
   hobby2: null,
   hobby3: null
}

describe('Full page render', () => {
   it('renders without crashing', () => {
      window.sessionStorage.setItem("loggedinuser", JSON.stringify(loggedInUser));
     
      let ProfileTest = class extends Profile {
         componentWillMount() { 
             this.setState(() => ({ profileUser: selectedUser }));
         }
     };
      shallow(<ProfileTest />);
   });
});