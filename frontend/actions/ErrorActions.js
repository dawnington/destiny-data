import Dispatcher from '../dispatcher/Dispatcher';
import ErrorConstants from '../constants/ErrorConstants';

module.exports = {
  addError() {
    Dispatcher.dispatch({
      actionType: ErrorConstants.PLAYER_NOT_FOUND,
    });
  },
  clearError() {
    Dispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERROR,
    });
  },
};
