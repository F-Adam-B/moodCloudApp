import React from 'react';
import { shallow } from 'enzyme';
import {Provider} from 'react-redux';
import adapter from '../../../setupTests';

import store from '../../../store';
import * as actions from '../../../actions';
import { DashboardStudent } from '../../../components/Dashboard-Student/Dashboard-Student';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(
      <Provider store={store}>
        <DashboardStudent />
      </Provider>
      )
  })

  it('should handle toggleView method', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
        <DashboardStudent dispatch={dispatch} />
    );
    dispatch.mockClear();
    const instance = wrapper.instance();
    instance.componentDidMount('student');
    expect(dispatch).toHaveBeenCalledWith(actions.toggleView('student'));
  })

});
