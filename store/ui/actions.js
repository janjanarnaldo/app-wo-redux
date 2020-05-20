'use strict';

const initializeLoadingActions = () => {
  const loading = (title) => {
    return {
      type: UI_TYPES.LOADING_SHOW,
      payload: { title },
    };
  }
  
  const loadingTerminate = () => {
    return {
      type: UI_TYPES.LOADING_TERMINATE,
    };
  }

  const modalShow = (children, submitAction) => {
    return {
      type: UI_TYPES.MODAL_SHOW,
      payload: { children, submitAction },
    };
  }
  
  const modalTerminate = () => {
    return {
      type: UI_TYPES.MODAL_TERMINATE,
    };
  }
  
  const handleLoading = (title) => {
    return function (dispatch) {
      dispatch(loading(title));
    };
  }

  const handleLoadingTerminate = () => {
    return function (dispatch) {
      dispatch(loadingTerminate());
    };
  }

  const handleModalShow = (children, submitAction) => {
    return function (dispatch) {
      dispatch(modalShow(children, submitAction));
    };
  }

  const handleModalTerminate = () => {
    return function (dispatch) {
      dispatch(modalTerminate());
    };
  }

  return {
    handleLoading,
    handleLoadingTerminate,
    handleModalShow,
    handleModalTerminate,
  }
}


const _uiActions = initializeLoadingActions();
