import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import StudentDetail from '../../../components/Students/StudentDetail';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<StudentDetail />)
  })

});
