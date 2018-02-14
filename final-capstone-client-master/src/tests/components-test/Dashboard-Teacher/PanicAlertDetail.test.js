import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import PanicAlertDetail from '../../../components/Dashboard-Teacher/PanicAlertDetail';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<PanicAlertDetail />)
  })

});
