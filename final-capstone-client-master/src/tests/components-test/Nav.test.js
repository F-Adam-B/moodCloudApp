import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../setupTests';

import * as actions from '../../actions';
import { Nav } from '../../components/Nav';

describe('Nav component', () => {

  it('should render without fail', () => {
    shallow(<Nav />)
  })

});
