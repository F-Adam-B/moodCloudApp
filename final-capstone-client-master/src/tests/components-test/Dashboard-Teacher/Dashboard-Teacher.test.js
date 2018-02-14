import React from 'react';
import { shallow } from 'enzyme';
import {Provider} from 'react-redux';
import adapter from '../../../setupTests';

import store from '../../../store';
import * as actions from '../../../actions';
import { DashboardTeacher } from '../../../components/Dashboard-Teacher/Dashboard-Teacher';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(
      <Provider store={store}>
        <DashboardTeacher />
      </Provider>
      )
  })

  it('should handle toggleView method', () => {
    const dispatch = jest.fn();
    const wrapper = shallow(
        <DashboardTeacher dispatch={dispatch} />
    );
    dispatch.mockClear();
    const instance = wrapper.instance();
    instance.componentDidMount('teacher');
    expect(dispatch).toHaveBeenCalledWith(actions.toggleView('teacher'));
  })

});
