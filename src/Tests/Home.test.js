import React from 'react';
import { shallow } from 'enzyme';
import Home from '../Home';

var loggedInUser = {
   userid: "1",
   username: "tester",
   password: "test123",
   firstname: "tester",
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
      //window.sessionStorage.setItem("loggedinuser",  JSON.stringify(loggedInUser));
      
      let HomeTest = class extends Home {
         componentDidMount() { 
             this.setState(() => ({ loggedInUser: loggedInUser, newProfileVisible: !this.state.newProfileVisible }));
         }
     };
      shallow(<HomeTest />);
   });
});

describe('test drawer toggle', () => {
   it('toggles without problems', () => {
      
      let HomeTest = class extends Home {
         componentDidMount() { 
             this.setState(() => ({ loggedInUser: loggedInUser, newProfileVisible: !this.state.newProfileVisible }));
         }
     };

      const component = shallow(<HomeTest />)
      const isOpen = true;

      component.instance().toggle("regular", true, "test");
      expect(component.regular.toEqual(isOpen));
   });
});