'use strict';

const _App = () => {
  const { createElement: e, Fragment } = React;
  const { Loader, Modal, Header, LostAndFoundPets, Footer } = components;

  return e(
    Fragment,
    null,
    e(Loader),
    e(Modal),
    e(Header),
    e(LostAndFoundPets),
    e(Footer),
  );
}
