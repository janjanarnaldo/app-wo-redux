'use strict';

const initialState = {
  ui: uiReducer.initialState,
  login: loginReducer.initialState,
  donation: donationReducer.initialState,
  animal: animalReducer.initialState,
}

const mainReducer = (state, action) => {
  const { logger } = middlewares;

  // Receiving previous state here
  const { ui, login, donation, animal } = state;

  // Receiving current state here
  const currentState = {
    ui: uiReducer.reducer(ui, action),
    login: loginReducer.reducer(login, action),
    donation: donationReducer.reducer(donation, action),
    animal: animalReducer.reducer(animal, action),
  };

  // Middlewares
  logger(action, state, currentState);

  return currentState;
}
