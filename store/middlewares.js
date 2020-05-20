'use strict';

function initializeMiddlewares() {
  return {
    asyncer: (dispatch, state) => (action) =>
      typeof action === 'function' ?  action(dispatch, state) : dispatch(action),
    logger: (action, prevState, currentState ) => {
      console.groupCollapsed('Logger');
      console.log('%c Action:', 'color: skyblue', action);
      console.log('%c Previous State:', 'color: red', prevState);
      console.log('%c Current State:', 'color: green', currentState);
      console.groupEnd();
    }
  }
}

const middlewares = initializeMiddlewares();
