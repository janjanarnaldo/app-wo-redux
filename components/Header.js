'use strict';

const _Header = () => {
  const { useRef, createElement: e } = React;
  const { addClass } = commonUtilities;
  const { useLogin, useUi } = hooks;

  const { Input, Button, UserDonations } = components;

  const { username, handleLogin, handleLogout, isLoggedIn } = useLogin();
  const { handleLoading, handleLoadingTerminate } = useUi();

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const _handleLogin = async (e) => {
    e.preventDefault();

    if (usernameInput.current.value && passwordInput.current.value) {
      handleLoading('Logging in...');
      await handleLogin(usernameInput.current.value, passwordInput.current.value);
      handleLoadingTerminate();
    } else {
      alert('Please provide login details');
    }
  }

  const logo = e('img', { src: 'assets/logo.png' });

  const inputUsername = e(Input, { _ref: usernameInput, placeholder: 'Username' });
  const inputPassword = e(Input, { _ref: passwordInput, placeholder: 'Password', type: 'password' });

  const Login = e(
    'div',
    addClass('cross-center'),
    logo,
    e(
      'form',
      { ...addClass('Header__Form cross-center'), onSubmit: _handleLogin },
      inputUsername,
      inputPassword,
      e(Button, { className: 'Header__BtnLogin', text: 'Login' }),
    ),
  );

  const LoggedInDetails = e(
    'div',
    addClass('cross-center'),
    logo,
    e(
      'div',
      addClass('Header__LoggedInDetails cross-center'),
      e(UserDonations),
      e('span', null, `Welcome, ${username}`),
      e(Button, { className: 'Header__BtnLogout', text: 'Logout', action: handleLogout }),
    ),
  );

  return e(
    'div',
    addClass('Header__root'),
    !isLoggedIn ? Login: LoggedInDetails,
  )
}
