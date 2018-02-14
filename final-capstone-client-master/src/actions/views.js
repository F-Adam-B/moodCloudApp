import * as types from './actionType';

export const toggleView = (selectedView) => ({
  type: types.TOGGLE_VIEW,
  selectedView,
});

export const toggleModal = (boolean) => ({
  type: types.TOGGLE_MODAL,
  boolean
})