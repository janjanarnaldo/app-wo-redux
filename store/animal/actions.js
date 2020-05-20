'use strict';

const initializeAnimalActions = () => {
  const { getAnimals: _getAnimals } = commonUtilities;

  const getAnimals = () => {
    return {
      type: ANIMALS_TYPES.GET,
    };
  }
  
  const success = (animals) => {
    return {
      type: ANIMALS_TYPES.GET_SUCCESS,
      payload: { animals }
    };
  }

  const failed = (error) => {
    return {
      type: ANIMALS_TYPES.GET_ERROR,
      payload: error
    };
  }
  
  const handleGetAnimals = (donations, idUser, filter) => {
    return async function (dispatch) {
      dispatch(getAnimals());
      try {
        const animals = await _getAnimals(donations, idUser, filter);
        dispatch(success(animals));
      } catch (error) {
        dispatch(failed(error.response.data));
      }
    };
  }

  return {
    handleGetAnimals
  }
}


const _animalActions = initializeAnimalActions();
