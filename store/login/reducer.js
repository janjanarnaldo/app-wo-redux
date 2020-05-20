'use strict';

const DEFAULT_USER_ID = 1;

const _loginReducer = {
  initialState: {
    idUser: null,
    username: '',
    isLoading: false,
    isLoggedIn: false,
    error: ''
  },
  login: (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_TYPES.INIT:
        return {
          ...state,
          error: '',
          isLoading: true
        };
      case LOGIN_TYPES.SUCCESS:
        return {
          ...state,
          idUser: DEFAULT_USER_ID,
          username: action.payload.username,
          isLoading: false,
          isLoggedIn: true
        };
      case LOGIN_TYPES.ERROR:
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
          error: action.payload
        };
      case LOGIN_TYPES.TERMINATE:
        return {
          ...state,
          idUser: null,
          username: '',
          isLoggedIn: false
        };
      default: {
        return state;
      }
    }
  }
}
