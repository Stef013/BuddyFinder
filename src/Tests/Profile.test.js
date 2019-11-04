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
   userid: "1",
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

      const expectedProps = {
         location: {
            state: {
               loggedInUser: loggedInUser,
               selectedUser: selectedUser
            }
         }
      };

      shallow(<Profile {...expectedProps} />);
   });
});