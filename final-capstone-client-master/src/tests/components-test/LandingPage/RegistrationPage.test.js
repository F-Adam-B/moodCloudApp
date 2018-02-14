import React from 'react';
import { shallow } from 'enzyme';
import {Provider} from 'react-redux';
import adapter from '../../../setupTests';

import store from '../../../store';
import * as actions from '../../../actions';
import { RegistrationPage } from '../../../components/LandingPage/RegistrationPage';

describe('RegistrationPage component', () => {

  it('should render without fail', () => {
    shallow(
      <Provider store={store}>
        <RegistrationPage />
      </Provider>)
  })

  it('should handle toggleView method', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
      <RegistrationPage dispatch={dispatch} />
    );
    dispatch.mockClear();
    const instance = wrapper.instance();
    instance.componentDidMount('signup');
    expect(dispatch).toHaveBeenCalledWith(actions.toggleView('signup'));
  })

});
