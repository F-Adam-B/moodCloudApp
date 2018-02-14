import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loadAuthToken } from './local-storage';
import { loadState, saveState } from './local-storage';
import * as actions from './actions'

import throttle from 'lodash/throttle';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(thunk)),
);

store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(actions.setAuthToken(token));
    store.dispatch(actions.refreshAuthToken());
}

export default store;