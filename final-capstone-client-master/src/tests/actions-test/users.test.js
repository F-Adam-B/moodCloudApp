import configureMockStore from 'redux-mock-store';
import * as actions from '../../actions';
import * as types from '../../actions/actionType';

import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import expect from 'expect';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('Successfully dispatches registerUser()', () => {
    fetchMock
        .getOnce('begin:http://localhost:3000/api/students/', { 
          method: 'POST',
          body: { 
            firstName: 'testerFn',
            lastName: 'testerLn',
            username: 'testerUn',
            password: 'testerPass',
            role: 'student'
            },
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: 'test' }
    ];
    const store = mockStore();

    return store.dispatch(actions.registerUser()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('catches error when registerUser() throws an error', () => {
    const store = mockStore();

    return store.dispatch(actions.registerUser()).then(() => {
      let outcome = store.getActions()[1]
      expect(outcome).toHaveProperty('err');
    });
  });

});
