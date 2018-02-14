import * as types from './actionType';
import { API_BASE_URL } from './../config';

export const fetchStudentsSuccess = (students) => ({
  type: types.FETCH_STUDENTS_SUCCESS,
  students,
});

export const fetchStudentsRequest = () => ({
  type: types.FETCH_STUDENTS_REQUEST,
});

export const fetchStudentsError = (err) => ({
  type: types.FETCH_STUDENTS_ERROR,
  err,
});

export const fetchStudentDetailSuccess = (studentDetail) => ({
  type: types.FETCH_STUDENT_DETAIL_SUCCESS,
  studentDetail,
})

export const fetchStudentDetailRequest = () => ({
  type: types.FETCH_STUDENT_DETAIL_REQUEST,
});

export const fetchStudentDetailError = (err) => ({
  type: types.FETCH_STUDENT_DETAIL_ERROR,
  err,
});

export const toggleInitialMoodSearch = (boolean) => ({
  type: types.TOGGLE_INITIAL_MOOD_SEARCH,
  boolean
})


// Retrieves all enrolled students of a teacher
export const fetchStudents = teacherID => (dispatch, getState) => {
  dispatch(fetchStudentsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/yourStudents/${teacherID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(students => dispatch(fetchStudentsSuccess(students)))
  .catch((err) => {
    dispatch(fetchStudentsError(err));
  });
};

// Retrieves detail of student and mood
export const fetchStudentDetail = studentID => (dispatch, getState) => {
  dispatch(fetchStudentDetailRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/yourStudents/detail/${studentID}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(students => dispatch(fetchStudentDetailSuccess(students))
  )
  .catch((err) => {
    dispatch(fetchStudentDetailError(err));
  });
};