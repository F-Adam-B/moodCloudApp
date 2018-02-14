import * as types from '../actions/actionType';

const initialState = {
  createdClasses: [],
  enrolledClasses: [],
  searchedClasses: [],
  initialSearch: false,
  loading: false,
  error: false,
};

const classesReducer = (state = initialState, action) => {
  switch (action.type){
    case types.FETCH_CLASSES_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      });
    case types.FETCH_CLASSES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        error: false,
      });
    case types.FETCH_CLASSES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.err,
      });
    case types.SEARCH_CLASSES_SUCCESS:
      return Object.assign({}, state, {
        searchedClasses: action.classes,
        loading: false,
        error: false,
      });
    case types.CLEAR_CLASSES_STORE:
      return Object.assign({}, initialState
      );
    case types.FETCH_CLASSES_BY_STUDENT_SUCCESS:
      return Object.assign({}, state, {
        enrolledClasses: action.classes,
        loading: false,
        error: false,
      });
    case types.FETCH_CLASSES_BY_TEACHER_SUCCESS:
      return Object.assign({}, state, {
        createdClasses: action.classes,
        loading: false,
        error: false,
      });
    case types.TOGGLE_INITIAL_SEARCH:
      return Object.assign({}, state, {
        initialSearch: action.boolean
      });
    default: break;
  }
  return state;
};

export default classesReducer;
