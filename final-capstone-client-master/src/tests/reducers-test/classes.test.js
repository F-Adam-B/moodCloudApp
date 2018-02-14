import classesReducer from '../../reducers/classes';
import * as actions from '../../actions/classes';
import * as types from '../../actions/actionType';

describe('classesReducer', () => {
  it('should return the initial state', () => {
    expect(classesReducer(undefined, {})).toEqual(
      {
        classes: [],
        loading: false,
        error: false,
      }
    );
  });

  it('should handle fetchClassesSuccess()', () => {
    expect(
      classesReducer({}, {
        type: types.FETCH_CLASSES_SUCCESS,
        classes: [{ class: 'Run the classes tests' }],
      })
    ).toEqual(
      {
        classes: [{ class: 'Run the classes tests' }],
        error: false,
        loading: false
      }
    );
  });

  it('should handle fetchClassesError()', () => {
    expect(
      classesReducer({}, {
        type: types.FETCH_CLASSES_ERROR,
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
      classesReducer({}, {
        type: types.FETCH_CLASSES_REQUEST,
      })
    ).toEqual(
      {
        error: false,
        loading: true
      }
    );
  });
});
