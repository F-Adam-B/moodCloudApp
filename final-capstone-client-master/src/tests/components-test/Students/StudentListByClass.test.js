import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import StudentListByClass from '../../../components/Students/StudentListByClass';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<StudentListByClass />)
  })

});
