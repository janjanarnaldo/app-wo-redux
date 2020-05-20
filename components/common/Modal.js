'use strict';

const _Modal = () => {
  const { createElement: e } = React;
  const { useUi } = hooks;
  const { isShowModal, handleModalTerminate, modalChildren, submitAction } = useUi();

  const { addClass } = commonUtilities;

  if (!isShowModal) return null;

  return e(
    'div',
    addClass('Modal__root'),
    e(
      'div',
      addClass('Modal__body'),
      modalChildren,
      e(
        'div',
        addClass('Modal__footer'),
        e(
          'button',
          { onClick: (e) => submitAction(e) },
          'Submit'
        ),
        e(
          'button',
          { ...addClass('btn-style-3'), onClick: () => handleModalTerminate() },
          'Close',
        )
      )
    )
  );
}

