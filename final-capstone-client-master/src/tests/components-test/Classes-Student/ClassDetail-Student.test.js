import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import ClassDetailStudent from '../../../components/Classes-Student/ClassDetail-Student';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<ClassDetailStudent />)
  })

});
