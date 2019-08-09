import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import React from 'react';
import ReactDOM from 'react-dom';
import MenuTogleBtn from '../MenuTogleBtn'
import renderer from 'react-test-renderer';

test('should change className', () => {
  let component = mount(<MenuTogleBtn/>);
  let props = component.instance();
  console.log(props);
  // /expect(props.)
})
