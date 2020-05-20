'use strict';

const _Footer = () => {
  const { createElement: e } = React;
  const { addClass } = commonUtilities;

  const copyright = e(
    'p',
    addClass('hbox cross-center'),
    '© 2020 FindLostPets.coco',
  );

  const socialIcons = [
    e(
      'a',
      { href: 'http://www.fb.com', target: '_blank' },
      e('img', { src: 'assets/icon-facebook.svg', alt: 'www.fb.com' }),
    ),
    e(
      'a',
      { href: 'http://www.twitter.com', target: '_blank' },
      e('img', { src: 'assets/icon-twitter.svg', alt: 'www.twitter.com' }),
    ),
    e(
      'a',
      { href: 'http://www.youtube.com', target: '_blank' },
      e('img', { src: 'assets/icon-youtube.svg', alt: 'www.youtube.com' }),
    ),
  ];

  return e(
    'div',
    addClass('Footer__root'),
    copyright,
    ...socialIcons,
  )
}
