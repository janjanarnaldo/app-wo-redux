'use strict';

function initializieUseLogin() {
  const { useGlobalStore } = store;

  const { actions } = loginReducer;

  return () => {
    const { state, dispatch } = useGlobalStore();

    const { login } = state;

    const {
      handleLogin,
      handleLogout,
    } = actions;

    const loginActions = bindActions({
      handleLogin,
      handleLogout,
    }, dispatch);

    return { ...login, ...loginActions };
  }
}

const _useLogin = initializieUseLogin();
