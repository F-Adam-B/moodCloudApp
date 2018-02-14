import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import RegistrationForm from '../../../components/LandingPage/RegistrationForm';

describe('RegistrationForm component', () => {

  it('should render without fail', () => {
    shallow(<RegistrationForm />)
  })

});
