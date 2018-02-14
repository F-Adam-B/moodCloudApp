import React from 'react';
import { shallow } from 'enzyme';
import {Provider} from 'react-redux';
import adapter from '../../../setupTests';

import store from '../../../store';
import * as actions from '../../../actions';
import { LoginPage } from '../../../components/LandingPage/LoginPage';

describe('LoginPage component', () => {

  it('should render without fail', () => {
    shallow(
      <Provider store={store}>
        <LoginPage />
      </Provider>)
  })

  it('should handle toggleView method', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
      <LoginPage dispatch={dispatch} />
    );
    dispatch.mockClear();
    const instance = wrapper.instance();
    instance.componentDidMount('login');
    expect(dispatch).toHaveBeenCalledWith(actions.toggleView('login'));
  })

});
