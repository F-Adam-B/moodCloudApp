import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import Students from '../../../components/Students/Students';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<Students />)
  })

});
