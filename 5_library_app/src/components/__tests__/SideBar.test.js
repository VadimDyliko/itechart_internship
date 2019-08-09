import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import Spiner from '../Spiner/Spiner'
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme'

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Spiner />, div);
});

test('is className content__spiner', () => {
  const spiner = shallow(
    <Spiner/>
  );
  console.log(spiner.debug());
  expect(spiner.hasClass('content__spiner')).toBe(true)
})
