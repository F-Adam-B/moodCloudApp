import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import ClassesTeacher from '../../../components/Classes-Teacher/Classes-Teacher';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<ClassesTeacher />)
  })

});
