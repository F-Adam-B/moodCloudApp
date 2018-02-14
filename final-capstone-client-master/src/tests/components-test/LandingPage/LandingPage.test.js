import React from 'react';
import store from '../../store';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import adapter from '../../../setupTests';

import { LandingPage } from '../../../components/LandingPage/LandingPage';

describe('LandingPage component', () => {

  it('should render without fail', () => {
    shallow(
      <Provider>
        <LandingPage />
      </Provider>)
  })

});
