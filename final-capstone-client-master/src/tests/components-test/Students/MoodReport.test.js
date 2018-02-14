import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import MoodReport from '../../../components/Students/MoodReport';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<MoodReport />)
  })

});
