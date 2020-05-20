'use strict';

const _Button = ({ className, text, action }) => {
  const { addClass } = commonUtilities;

  return React.createElement(
    'button',
    { ...addClass(className), onClick: action },
    text || 'Button',
  )
}
