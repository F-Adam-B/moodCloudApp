import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import adapter from '../../../setupTests';

import store from '../../../store';
import * as actions from '../../../actions';
import { Features } from '../../../components/LandingPage/Features';

describe('Features component', () => {
  it('should render without fail', () => {
    shallow(
      <Provider store={store}>
        <Features />
      </Provider>)
  })

  it('should handle toggleView method', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
        <Features dispatch={dispatch} />
    );
    dispatch.mockClear();
    const instance = wrapper.instance();
    instance.componentDidMount('features');
    expect(dispatch).toHaveBeenCalledWith(actions.toggleView('features'));
  })

});
