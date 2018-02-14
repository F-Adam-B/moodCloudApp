import * as types from '../actions/actionType';

const initialState = {
  panicStudents: [],
  moodAlertStudents: [],
  userPanic: [],
  panicToggled: false,
  loading: false,
  error: false,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type){
    case types.FETCH_ALERTS_ERROR:
      return Object.assign({}, state, {
        error: action.err,
      });
    case types.FETCH_ALERTS_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        error: false,
      });
    case types.FETCH_PANIC_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        panicStudents: action.alerts,
        loading: false,
        error: false,
      });
    case types.FETCH_MOOD_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        moodAlertStudents: action.alerts,
        loading: false,
        error: false,
      });
    case types.SUBMIT_ALERT_SUCCESS:
      return Object.assign({}, state, {
        userPanic: action.alert,
        loading: true,
        error: false,
      });
    case types.TOGGLE_ALERT_BUTTON:
      return Object.assign({}, state, {
        panicToggled: action.boolean,
      });
    case types.FETCH_UNTOGGLE_ALERTS_SUCCESS:
      return Object.assign({}, state, {
        panicStudents: [],
        error: false,
        loading: false
      });
    // case types.TOGGLE_ALERT_OFF:
    //   return Object.assign({}, state, {
    //     panicToggled: false,
    //     error: false,
    //   });
    // case types.DISMISS_ALERT:
    //   return Object.assign({}, state, {
    //     panicToggled: false,
    //     error: false,
    //   });
    // case types.FETCH_MOOD_ALERTS_BY_TEACHER:
    //   return Object.assign({}, state, {
    //     students: [],
    //     error: false,
    //   });
    // case types.FETCH_ALERTS_BY_STUDENT_SUCCESS:
    //   return Object.assign({}, state, {
    //     panicToggled: true,
    //     error: false,
    //   });
    default: break;
  }
  return state;
};

export default alertReducer;
