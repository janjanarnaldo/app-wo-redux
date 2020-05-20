'use strict';

const _donationReducer = {
  initialState: {
    donations: [],
    isLoading: false,
    error: '',
  },
  donation: (state = initialState, action) => {
    switch (action.type) {
      case DONATION_TYPES.GET:
        return {
          ...state,
          donations: [],
          isLoading: true
        };
      case DONATION_TYPES.GET_SUCCESS:
        return {
          ...state,
          donations: action.payload.donations,
          isLoading: false
        };
      case DONATION_TYPES.GET_ERROR:
        return {
          ...state,
          donations: [],
          isLoading: false,
          error: action.payload,
        };
      case DONATION_TYPES.DONATE:
        return {
          ...state,
          donations: [],
          isLoading: true
        };
      case DONATION_TYPES.DONATE_SUCCESS:
        return {
          ...state,
          donations: action.payload.donations,
          isLoading: false
        };
      case DONATION_TYPES.DONATE_ERROR:
        return {
          ...state,
          donations: [],
          isLoading: false,
          error: action.payload,
        };
      default: {
        return state;
      }
    }
  }
}
