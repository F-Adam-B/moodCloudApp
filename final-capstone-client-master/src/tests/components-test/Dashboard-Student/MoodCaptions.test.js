import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import MoodCaptions from '../../../components/Dashboard-Student/MoodCaptions';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<MoodCaptions />)
  })

});
