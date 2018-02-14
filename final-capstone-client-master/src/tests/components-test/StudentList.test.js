import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../setupTests';

import StudentList from '../../components/StudentList';

describe('LandingPage component', () => {

  it('should render without fail', () => {
    shallow(<StudentList />)
  })

});
