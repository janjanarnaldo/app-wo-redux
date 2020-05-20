'use strict';

(function() {
  const { createElement: e } = React;
  const { Provider } = store;

  const { App } = components;

  const RenderApp = e(App);

  ReactDOM.render(
    e(Provider, null, RenderApp),
    document.getElementById('root'),
  );
})();
