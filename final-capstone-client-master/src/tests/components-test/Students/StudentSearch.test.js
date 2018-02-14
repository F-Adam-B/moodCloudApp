import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import StudentSearch from '../../../components/Students/StudentSearch';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<StudentSearch />)
  })

});
