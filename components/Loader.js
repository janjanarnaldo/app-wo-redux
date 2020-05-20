'use strict';

const _Loader = () => {
  const { createElement: e } = React;
  const { addClass } = commonUtilities;

  const { useUi } = hooks;

  const { isLoading, loadingTitle } = useUi();

  const rootClass = ['Loader__root'];

  if (isLoading) rootClass.push('Loader__loading');

  return e(
    'div',
    addClass(rootClass.join(' ')),
    e('div', addClass('Loader__layer')),
    e('i', null, loadingTitle),
  )
};
