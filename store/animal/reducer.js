'use strict';

const _animalReducer = {
  initialState: {
    isLoading: false,
    animals: [],
    error: '',
  },
  ui: (state = initialState, action) => {
    switch (action.type) {
      case ANIMALS_TYPES.GET:
        return {
          ...state,
          isLoading: true,
          animals: [],
        };
      case ANIMALS_TYPES.GET_SUCCESS:
        return {
          ...state,
          isLoading: false,
          animals: action.payload.animals || [],
        };
        case ANIMALS_TYPES.GET_ERROR:
          return {
            ...state,
            isLoading: false,
            error: action.payload,
          };
      default: {
        return state;
      }
    }
  }
}
