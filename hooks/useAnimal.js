'use strict';

function initializieUseAnimal() {
  const { useGlobalStore } = store;

  const { actions } = animalReducer;

  return () => {
    const { state, dispatch } = useGlobalStore();

    const { animal } = state;

    const {
      handleGetAnimals,
    } = actions;

    const animalActions = bindActions({
      handleGetAnimals,
    }, dispatch);

    return { ...animal, ...animalActions };
  }
}

const _useAnimal = initializieUseAnimal();
