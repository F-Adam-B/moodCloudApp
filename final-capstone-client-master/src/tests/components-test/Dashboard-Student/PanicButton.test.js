import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import PanicButton from '../../../components/Dashboard-Student/PanicButton';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<PanicButton />)
  })

});
