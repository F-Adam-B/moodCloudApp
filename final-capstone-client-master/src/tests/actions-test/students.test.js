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

  it('creates FETCH_STUDENTS_REQUEST & FETCH_STUDENTS_SUCCESS when fetchStudents() has been called', () => {
    fetchMock
        .getOnce('begin:http://localhost:3000/api/students/', { body: { students: ['do something'] },
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: types.FETCH_STUDENTS_REQUEST },
      { students: { students: ['do something'] }, type: types.FETCH_STUDENTS_SUCCESS },
    ];
    const store = mockStore({ students: [] });

    return store.dispatch(actions.fetchStudents()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('catches error when fetchClass() throws an error', () => {
    const store = mockStore();

    return store.dispatch(actions.fetchStudents()).then(() => {
      let outcome = store.getActions()[1]
      expect(outcome).toHaveProperty('err');
      expect(outcome.type).toEqual("FETCH_STUDENTS_ERROR");
    });
  });

});


describe('sync actions', () => {
  it('returns expected type when FETCH_STUDENTS_REQUEST has been called', () => {
    const expectedAction = {
      type: types.FETCH_STUDENTS_REQUEST
    }
    expect (actions.fetchStudentsRequest()).toEqual(expectedAction)
  })

  it('returns expected type when FETCH_STUDENTS_SUCCESS has been called', () => {
    const expectedAction = {
      type: types.FETCH_STUDENTS_SUCCESS
    }
    expect (actions.fetchStudentsSuccess()).toEqual(expectedAction)
  })

  it('returns expected type when FETCH_STUDENTS_ERROR has been called', () => {
    const expectedAction = {
      type: types.FETCH_STUDENTS_ERROR
    }
    expect (actions.fetchStudentsError()).toEqual(expectedAction)
  })
});
