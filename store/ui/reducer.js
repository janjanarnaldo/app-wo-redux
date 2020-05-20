'use strict';

const DEFAULT_LOADING_TITLE = 'Loading...';

const _uiReducer = {
  initialState: {
    isLoading: false,
    loadingTitle: '',
    isShowModal: false,
    modalChildren: null,
    submitAction: commonUtilities.noop,
  },
  ui: (state = initialState, action) => {
    switch (action.type) {
      case UI_TYPES.LOADING_SHOW:
        return {
          ...state,
          isLoading: true,
          loadingTitle: action.payload.title || DEFAULT_LOADING_TITLE,
        };
      case UI_TYPES.LOADING_TERMINATE:
        return {
          ...state,
          isLoading: false,
          loadingTitle: '',
        };
        case UI_TYPES.MODAL_SHOW:
          return {
            ...state,
            isShowModal: true,
            modalChildren: action.payload.children,
            submitAction: action.payload.submitAction,
          };
        case UI_TYPES.MODAL_TERMINATE:
          return {
            ...state,
            isShowModal: false,
            modalChildren: null,
            submitAction: commonUtilities.noop,
          };
      default: {
        return state;
      }
    }
  }
}
