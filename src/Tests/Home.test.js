import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

var loggedInUser = {
   userid: "1",
   username: "tester",
   password: "test123",
   firstname: null,
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
      window.sessionStorage.setItem("loggedinuser",  JSON.stringify(loggedInUser));
            
      shallow(<Home />);
   });
});