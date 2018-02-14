import * as types from './actionType';
import { API_BASE_URL } from './../config';
import { normalizeResponseErrors } from './utils';

//----- SYNC ACTIONS -----//

// UNIVERSAL: Toggle Loading
export const fetchClassesRequest = () => ({
  type: types.FETCH_CLASSES_REQUEST,
});
// UNIVERSAL: Toggle Error
export const fetchClassesError = (err) => ({
  type: types.FETCH_CLASSES_ERROR,
  err,
});

// UNIVERSAL: Toggle Success
export const fetchClassesSuccess = () => ({
  type: types.FETCH_CLASSES_SUCCESS,
})

export const clearClassesStore = () => ({
  type: types.CLEAR_CLASSES_STORE,
})


// STUDENT: Search class by teacher name
export const searchClassesSuccess = (classes) => ({
  type: types.SEARCH_CLASSES_SUCCESS,
  classes,
});

// STUDENT: Retrieve all enrolled classes
export const fetchClassesByStudentSuccess = (classes) => ({
  type: types.FETCH_CLASSES_BY_STUDENT_SUCCESS,
  classes,
});

// STUDENT: Toggle initial search
export const toggleInitialSearch = (boolean) => ({
  type: types.TOGGLE_INITIAL_SEARCH,
  boolean
});

// TEACHER: Retrieve all created classes
export const fetchClassesByTeacherSuccess = (classes) => ({
  type: types.FETCH_CLASSES_BY_TEACHER_SUCCESS,
  classes,
});

//----- STUDENT: ASYNC ACTIONS  -----//

// STUDENT: Search class by teacher name // CONNECTED
export const searchClasses = lastName => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchClassesRequest());
  return fetch(`${API_BASE_URL}/classes/search/${lastName}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(classes => dispatch(searchClassesSuccess(classes)))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};

// STUDENT: Enroll to an existing class // CONNECTED
export const enrollClass = (data) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/classes/student/enroll/${data.classID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        body: JSON.stringify(data),
      })
     .then(res => normalizeResponseErrors(res))
    //  .then(res => {res.json()})
     .then(() => dispatch(fetchClassesByStudent(data.studentID)))
     .catch((err) => {
      dispatch(fetchClassesError(err));
    });
};

// STUDENT: Retrieve all enrolled classes // CONNECTED
export const fetchClassesByStudent = studentID => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchClassesRequest());
  return fetch(`${API_BASE_URL}/classes/student/${studentID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`,
    }
  })
  .then(res => res.json())
  .then(classes => dispatch(fetchClassesByStudentSuccess(classes)))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};

// STUDENT: Delete selected class
export const deleteClassByStudent = data => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchClassesRequest());
  return fetch(`${API_BASE_URL}/classes/student/remove/${data.classID}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(data)
  })
  .then(res => normalizeResponseErrors(res))
  // .then(res => res.json())
  .then(() => dispatch(fetchClassesByStudent(data.studentID)))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};

//----- TEACHER: ASYNC ACTIONS  -----//

// TEACHER: Create a new class // CONNECTED
export const createClass = (data) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  dispatch(fetchClassesRequest());
  return fetch(`${API_BASE_URL}/classes/teacher/create`, {
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
    .then(() => dispatch(fetchClassesByTeacher(data.id)))
    .catch((err) => {
      dispatch(fetchClassesError(err));
    });
};

// TEACHER: Retrieves all created classes // CONNECTED
export const fetchClassesByTeacher = teacherID => (dispatch, getState) => {
  dispatch(fetchClassesRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/classes/teacher/${teacherID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(classes => dispatch(fetchClassesByTeacherSuccess(classes)))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};

// TEACHER: Delete selected class // CONNECTED
export const deleteClassByTeacher = data => (dispatch, getState) => {
  dispatch(fetchClassesRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/classes/teacher/close/${data.classID}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }
  })
  .then(res => normalizeResponseErrors(res))
  // .then(res => res.json())
  .then(() => dispatch(fetchClassesByTeacher(data.teacherID)))
  .catch((err) => {
    dispatch(fetchClassesError(err));
  });
};