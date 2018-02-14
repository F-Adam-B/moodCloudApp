import studentsReducer from '../../reducers/students';
import * as actions from '../../actions/students';
import * as types from '../../actions/actionType';

describe('studentsReducer', () => {
  it('should return the initial state', () => {
    expect(studentsReducer(undefined, {})).toEqual(
      {
        students: [],
        loading: false,
        error: false,
      }
    );
  });

  it('should handle fetchStudentsSuccess()', () => {
    expect(
      studentsReducer({}, {
        type: types.FETCH_STUDENTS_SUCCESS,
        students: [{ student: 'Run the students tests' }],
      })
    ).toEqual(
      {
        students: [{ student: 'Run the students tests' }],
        error: false,
        loading: false
      }
    );
  });

  it('should handle fetchClassesError()', () => {
    expect(
      studentsReducer({}, {
        type: types.FETCH_STUDENTS_ERROR,
      })
    ).toEqual(
      {
        error: undefined,
        loading: false
      }
    );
  });

  it('should handle fetchClassesRequest()', () => {
    expect(
      studentsReducer({}, {
        type: types.FETCH_STUDENTS_REQUEST,
      })
    ).toEqual(
      {
        error: false,
        loading: true
      }
    );
  });
});
