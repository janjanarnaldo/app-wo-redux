'use strict';

function initializieUseDonation() {
  const { useGlobalStore } = store;

  const { actions } = donationReducer;

  return () => {
    const { state, dispatch } = useGlobalStore();

    const { donation } = state;

    const {
      handleGetDonations,
      handleDonate,
    } = actions;

    const donationActions = bindActions({
      handleGetDonations,
      handleDonate,
    }, dispatch);

    return { ...donation, ...donationActions };
  }
}

const _useDonation = initializieUseDonation();
