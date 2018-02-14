import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import AddClass from '../../../components/Classes-Teacher/AddClass';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<AddClass />)
  })

});
