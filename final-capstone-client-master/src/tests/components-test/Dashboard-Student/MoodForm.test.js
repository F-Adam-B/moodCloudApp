import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import MoodForm from '../../../components/Dashboard-Student/MoodForm';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<MoodForm />)
  })

});
