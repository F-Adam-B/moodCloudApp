'use strict';
import store from '../../store';
import * as actions from '../../actions';
import * as types from '../../actions/actionType';

// const desiredStore = {"dispatch": [Function anonymous], "getState": [Function getState], "replaceReducer": [Function replaceReducer], "subscribe": [Function subscribe], Symbol(observable): [Function observable]};

describe('redux store', () => {
  it('should initiate with correct properties', () => {
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');
    expect(store).toHaveProperty('replaceReducer');
    expect(store).toHaveProperty('subscribe');
  })

  // STORE changes with every new reducer
  it('should initiate with correct state with from reducers', () => {
    let state = store.getState()
    expect(state).toEqual(
      {"classes": {
        "classes": [], "error": false, "loading": false}, 
        "students": {"error": false, "loading": false, "students": []},
        "form": {},
        "view": {"selectedView": "landing-page"}}
    );
  })
})

describe('Store dispatch updates state with respective actions', () => {
  it('should update state with fetchClasses()', () => {
    store.dispatch(actions.fetchClassesSuccess([{class: 'test'}]));
    let state = store.getState().classes
    expect(state).toEqual({"classes": [{"class": "test"}], "error": false, "loading": false});
  })

  it('should update state with fetchStudents()', () => {
    store.dispatch(actions.fetchStudentsSuccess([{student: 'test'}]));
    let state = store.getState().students
    expect(state).toEqual({"students": [{"student": "test"}], "error": false, "loading": false});
  })
})