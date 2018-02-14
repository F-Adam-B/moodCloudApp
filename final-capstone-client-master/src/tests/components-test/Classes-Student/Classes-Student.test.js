import React from 'react';
import { shallow } from 'enzyme';
import adapter from '../../../setupTests';

import ClassesStudent from '../../../components/Classes-Student/Classes-Student';

describe('Features component', () => {

  it('should render without fail', () => {
    shallow(<ClassesStudent />)
  })

});
