import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import ClassDetailTeacher from '../../../components/Classes-Teacher/ClassDetail-Teacher';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<ClassDetailTeacher />)
  })

});
