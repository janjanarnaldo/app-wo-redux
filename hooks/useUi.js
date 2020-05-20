'use strict';

function initializieUseUi() {
  const { useGlobalStore } = store;

  const { actions } = uiReducer;

  return () => {
    const { state, dispatch } = useGlobalStore();

    const { ui } = state;

    const {
      handleLoading,
      handleLoadingTerminate,
      handleModalShow,
      handleModalTerminate,
    } = actions;

    const uiActions = bindActions({
      handleLoading,
      handleLoadingTerminate,
      handleModalShow,
      handleModalTerminate,
    }, dispatch);

    return { ...ui, ...uiActions };
  }
}

const _useUi = initializieUseUi();
