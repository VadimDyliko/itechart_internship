import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

import React from 'react';
import ReactDOM from 'react-dom';
import MenuTogleBtn from '../MenuTogleBtn'
import renderer from 'react-test-renderer';

describe('MenuTogleBtn render while SideBar is close', () => {
  let isOpenHandlerMock = jest.fn();
  let props = {
    isOpen: false,
    isOpenHandler: isOpenHandlerMock
  }
  let component = shallow(<MenuTogleBtn {...props}/>);

  it('renders properly', () => {
    expect(component).toMatchSnapshot()
  })

  it('onClick event should call isOpenHandler', () => {
    component.simulate('click')
    expect(isOpenHandlerMock).toHaveBeenCalledTimes(1)
  })
})

describe('MenuTogleBtn render while SideBar is open', () => {
  let props = {
    isOpen: true
  }
  let component = shallow(<MenuTogleBtn {...props}/>);

  it('renders properly', () => {
    expect(component).toMatchSnapshot()
  })
})
