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

  it('creates FETCH_CLASSES_REQUEST & FETCH_CLASSES_SUCCESS when fetchClasses() has been called', () => {
    fetchMock
        .getOnce(`begin:http://localhost:3000/api/classes/search/`, { body: { classes: ['do something'] },
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: types.FETCH_CLASSES_REQUEST },
      { classes: { classes: ['do something'] }, type: types.FETCH_CLASSES_SUCCESS },
    ];
    const store = mockStore({ classes: [] });

    return store.dispatch(actions.fetchClasses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('catches error when fetchClass() throws an error', () => {
    const store = mockStore();

    return store.dispatch(actions.fetchClasses()).then(() => {
      let outcome = store.getActions()[1]
      expect(outcome).toHaveProperty('err');
      expect(outcome.type).toEqual("FETCH_CLASSES_ERROR");
    });
  });

});


describe('sync actions', () => {
  it('returns expected type when FETCH_CLASSES_REQUEST has been called', () => {
    const expectedAction = {
      type: types.FETCH_CLASSES_REQUEST
    }
    expect (actions.fetchClassesRequest()).toEqual(expectedAction)
  })

  it('returns expected type when FETCH_CLASSES_SUCCESS has been called', () => {
    const expectedAction = {
      type: types.FETCH_CLASSES_SUCCESS
    }
    expect (actions.fetchClassesSuccess()).toEqual(expectedAction)
  })

  it('returns expected type when FETCH_CLASSES_ERROR has been called', () => {
    const expectedAction = {
      type: types.FETCH_CLASSES_ERROR
    }
    expect (actions.fetchClassesError()).toEqual(expectedAction)
  })
});