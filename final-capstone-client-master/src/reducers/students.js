import * as types from '../actions/actionType';

const initialState = {
  students: [],
  studentDetail: [],
  initialSearch: false,
  loading: false,
  error: false,
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type){
    case types.FETCH_STUDENTS_SUCCESS:
      return Object.assign({}, state, {
        students: action.students,
        loading: false,
        error: false,
      });
    case types.FETCH_STUDENTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      });
    case types.FETCH_STUDENTS_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.err,
      });
    case types.FETCH_STUDENT_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        studentDetail: action.studentDetail,
        loading: false,
        error: false,
      });
    case types.FETCH_STUDENT_DETAIL_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      });
    case types.FETCH_STUDENT_DETAIL_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.err,
      });
    case types.TOGGLE_INITIAL_MOOD_SEARCH:
      return Object.assign({}, state, {
        initialSearch: action.boolean,
      });
    default: break;
  }
  return state;
};

export default studentsReducer;
