import Dispatcher from '../dispatcher/Dispatcher';
import { Store } from 'flux/utils';
import ErrorConstants from '../constants/ErrorConstants';

let _error = false;

const ErrorStore = new Store(Dispatcher);

function clearError() {
  _error = false;
  ErrorStore.__emitChange();
}

function addError() {
  _error = true;
  ErrorStore.__emitChange();
}

ErrorStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ErrorConstants.PLAYER_NOT_FOUND:
      addError();
      break;
    case ErrorConstants.CLEAR_ERROR:
      clearError();
      break;
    default:
      break;
  }
};

ErrorStore.hasError = function () {
  return _error;
};

module.exports = ErrorStore;
