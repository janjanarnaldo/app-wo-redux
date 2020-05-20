'use strict';

function initializeStore() {
  const { asyncer } = middlewares;
  const { createContext, useContext, useReducer, useCallback, createElement: e } = React;
  const GlobalStore = createContext();

  const useGlobalStore = () => useContext(GlobalStore);

  const Provider = ({ children }) => {
    const [ state, dispatchBase ] = useReducer(mainReducer, initialState);

    const dispatch = useCallback(asyncer(dispatchBase, state), []);

    return e(
      GlobalStore.Provider,
      { value: { state, dispatch } },
      children,
    )
  }

  return {
    useGlobalStore,
    Provider,
  }
}

const store = initializeStore();