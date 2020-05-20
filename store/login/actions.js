'use strict';

const initializeLoginActions = () => {
  const { fakeLogin } = commonUtilities;

  const login = () => {
    return {
      type: LOGIN_TYPES.INIT
    };
  }
  
  const success = (username, password) => {
    return {
      type: LOGIN_TYPES.SUCCESS,
      payload: { username, password }
    };
  }
  
  const failed = (error) => {
    return {
      type: LOGIN_TYPES.ERROR,
      payload: error
    };
  }
  
  const handleLogin = (username, password) => {
    return async function (dispatch) {
      dispatch(login());
      try {
        await fakeLogin(username, password);
        dispatch(success(username, password));
      } catch (error) {
        dispatch(failed(error.response.data));
      }
    };
  }
  
  const handleLogout = () => {
    return {
      type: LOGIN_TYPES.TERMINATE
    };
  }

  return {
    handleLogin,
    handleLogout,
  }
}


const _loginActions = initializeLoginActions();
