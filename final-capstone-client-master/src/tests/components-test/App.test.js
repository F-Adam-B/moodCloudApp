import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from '../../store';
import App from '../../App';
import Nav from '../../components/Nav';

describe('<App />', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render <Nav /> component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Nav).length).toBe(1);
  });

  // TODO: Find out how to test Link components
});
