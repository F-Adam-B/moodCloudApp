import React from 'react';
import { shallow } from 'enzyme';
import {Provider} from 'react-redux';
import adapter from '../../setupTests';

import store from '../../store';
import * as actions from '../../actions';
import Input from '../../components/Input';

describe('Input component', () => {

  it('should render without fail', () => {
    shallow(
      <Provider store={store}>
        <Input />
      </Provider>
      )
  })

});