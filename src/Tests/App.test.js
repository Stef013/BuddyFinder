import React from 'react';
import { mount } from 'enzyme';
import App from '../App';

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      mount(<App />);
    });
});


describe('Examining the syntax of Jest tests', () => {
   
    it('sums numbers', () => {
        expect(1 + 2).toEqual(3);
        expect(2 + 2).toEqual(4);
     });
  });