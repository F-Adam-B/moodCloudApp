import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import MoodSelections from '../../../components/Dashboard-StudentMoodSelections';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<MoodSelections />)
  })

});
