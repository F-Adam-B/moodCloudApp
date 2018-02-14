import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import EmotionsDetail from '../../../components/Students/EmotionsDetail';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<EmotionsDetail />)
  })

});
