import * as types from './actionType';
import { API_BASE_URL } from './../config';
import { normalizeResponseErrors } from './utils';

//----- SYNC ACTIONS -----//

// All: Request all alerts
export const fetchAlertsRequest = () => ({
  type: types.FETCH_ALERTS_REQUEST,
});

// Teacher: Panic alerts Successfully Retrieved
export const fetchPanicAlertsSuccess = (alerts) => ({
  type: types.FETCH_PANIC_ALERTS_SUCCESS,
  alerts,
});

// Teacher: Mood alerts Successfully Retrieved
export const fetchMoodAlertsSuccess = (alerts) => ({
  type: types.FETCH_MOOD_ALERTS_SUCCESS,
  alerts,
});

// All: Toggle Error
export const fetchAlertsError = (err) => ({
  type: types.FETCH_ALERTS_ERROR,
  err,
});

// Student: Successfully submits panic
export const submitAlertSuccess = (alert) => ({
  type: types.SUBMIT_ALERT_SUCCESS,
  alert
})

// Student: Toggles Alert Button
export const toggleAlertButton = boolean => ({
  type: types.TOGGLE_ALERT_BUTTON,
  boolean,
})

// Student: Dismisses Panic alert
export const fetchUntoggleAlertsSuccess = () => ({
  type: types.FETCH_UNTOGGLE_ALERTS_SUCCESS,
});

//----- STUDENT: ASYNC ACTIONS  -----//

// STUDENT: Toggle panic alert on
export const studentAlertTeachers = (data) => (dispatch, getState) => {
  dispatch(fetchAlertsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/alert/panic/on`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
        body: JSON.stringify(data),
      })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then((result) => {
      dispatch(fetchAlert(result.studentID, result.alertID))
    })
    .catch((err) => {
      dispatch(fetchAlertsError(err));
    });
};

// STUDENT: Submit Alert
export const fetchAlert = (studentID, alertID) => (dispatch, getState) => {
  dispatch(fetchAlertsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/alert/${studentID}/${alertID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(alerts => {
    dispatch(submitAlertSuccess(alerts))
  })
  .catch((err) => {
    dispatch(fetchAlertsError(err));
  });
}

// STUDENT: Toggle panic alert off
export const toggleAlertOff = (data) => (dispatch, getState) => {
  dispatch(fetchAlertsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/alert/panic/off`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${authToken}`
          },
        body: JSON.stringify(data),
      })
     .then(res => normalizeResponseErrors(res))
     .then(() => {
      dispatch(fetchUntoggleAlertsSuccess())
     })
     .catch((err) => {
      dispatch(fetchAlertsError(err));
    });
};

//----- TEACHER: ASYNC ACTIONS  -----//

// TEACHER: Retrieves all critical emotion alerts attached to teacher ID
export const fetchMoodAlertsByTeacher = teacherID => (dispatch, getState) => {
  dispatch(fetchAlertsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/alert/mood/${teacherID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  })
  .then(res => res.json())
  .then(alerts => dispatch(fetchMoodAlertsSuccess(alerts)))
  .catch((err) => {
    dispatch(fetchAlertsError(err));
  });
};

// // TEACHER: Retrieves all panic alerts attached to studentID
export const fetchPanicAlertsByTeacher = teacherID => (dispatch, getState) => {
  dispatch(fetchAlertsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/alert/panic/${teacherID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  })
  .then(res => res.json())
  .then(alerts => dispatch(fetchPanicAlertsSuccess(alerts)))
  .catch((err) => {
    dispatch(fetchAlertsError(err));
  });
};

// // TEACHER: Dismisses a panic alert
export const dismissAlert = (data) => (dispatch, getState) => {
  dispatch(fetchAlertsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/alert/panic/dismiss/${data.panicID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        body: JSON.stringify(data),
      })
    .then(res => normalizeResponseErrors(res))
    //.then(res => res.json())
    .then(() => dispatch(fetchPanicAlertsByTeacher(data.teacherID)))
    .catch((err) => {
      dispatch(fetchAlertsError(err));
    });
};