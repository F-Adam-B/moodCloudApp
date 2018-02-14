'use strict';
import store from '../../store';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store'

import * as actions from '../../actions';


describe('thunk middleware', () => {
  it('should return async actions to be an instance of a Function', () => {
    expect(actions.fetchClasses()).toBeInstanceOf(Function);
    expect(actions.fetchStudents()).toBeInstanceOf(Function);
  })
  it('should return sync actions to be an instance of an Object', () => {
    expect(actions.fetchClassesSuccess()).toBeInstanceOf(Object);
    expect(actions.fetchStudentsSuccess()).toBeInstanceOf(Object);
  })

});