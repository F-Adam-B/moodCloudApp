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

  it('creates AUTH_REQUEST & AUTH_SUCCESS when login() has been called', () => {
    fetchMock
        .getOnce(`begin:http://localhost:3000/api/login/`, { body: { 
          username: 'testUn',
          password: 'testPass'
         },
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: 'test' }
    ];
    const store = mockStore();

    return store.dispatch(actions.login()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('catches error when login() throws an error', () => {
    const store = mockStore();

    return store.dispatch(actions.login()).then(() => {
      let outcome = store.getActions()[1]
      expect(outcome).toHaveProperty('err');
      expect(outcome.type).toEqual("AUTH_ERROR");
    });
  });

});

describe('sync actions', () => {
  it('returns expected type when AUTH_REQUEST has been called', () => {
    const expectedAction = {
      type: types.AUTH_REQUEST
    }
    expect (actions.authRequest()).toEqual(expectedAction)
  })

  it('returns expected type when AUTH_SUCCESS has been called', () => {
    const expectedAction = {
      type: types.AUTH_SUCCESS
    }
    expect (actions.authSuccess()).toEqual(expectedAction)
  })

  it('returns expected type when AUTH_ERROR has been called', () => {
    const expectedAction = {
      type: types.AUTH_ERROR
    }
    expect (actions.authError()).toEqual(expectedAction)
  })
});