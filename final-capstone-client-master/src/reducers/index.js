import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import classesReducer from './classes';
import viewReducer from './views';
import authReducer from './auth';
import alertReducer from './alert';
import moodsReducer from './moods';
import studentsReducer from './students';
import socketioReducer from './socketio';
import protectedDataReducer from './protected-data';
import conversationsReducer from './conversations';


const rootReducer = combineReducers({
  classes: classesReducer,
  form: formReducer,
  moods: moodsReducer,
  yourStudents: studentsReducer,
  view: viewReducer,
  alert: alertReducer,
  socketio: socketioReducer,
  auth: authReducer,
  protectedData: protectedDataReducer,
  conversations: conversationsReducer,
});

export default rootReducer;
