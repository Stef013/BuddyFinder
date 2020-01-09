import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';

describe('Full page render', () => {
   it('renders without crashing', () => {
      mount(<App />);
   });
});

describe('Test switch function', () => {
   it('it hides and shows containers correctly', () => {

      const component = shallow(<App />)
      const hidden = false;
      const shown = true;

      component.instance().switchContainers();
      expect(component.state('loginVisible')).toEqual(hidden);
      expect(component.state('registerVisible')).toEqual(shown);
   });
});
