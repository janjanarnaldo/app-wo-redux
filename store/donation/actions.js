'use strict';

const initializeDonationActions = () => {
  const { getDonations, donate: _donate } = commonUtilities;

  const get = () => {
    return {
      type: DONATION_TYPES.GET
    };
  }
  
  const getSuccess = (donations) => {
    return {
      type: DONATION_TYPES.GET_SUCCESS,
      payload: { donations }
    };
  }

  const getFailed = (error) => {
    return {
      type: DONATION_TYPES.GET_ERROR,
      payload: error
    };
  }

  const donate = () => {
    return {
      type: DONATION_TYPES.DONATE,
    };
  }
  
  const donateSuccess = (donations) => {
    return {
      type: DONATION_TYPES.DONATE_SUCCESS,
      payload: { donations }
    };
  }

  const donateFailed = (error) => {
    return {
      type: DONATION_TYPES.DONATE_ERROR,
      payload: error
    };
  }
  
  const handleGetDonations = (idUser) => {
    return async function (dispatch) {
      dispatch(get());
      try {
        const donations = await getDonations(idUser);
        dispatch(getSuccess(donations));
      } catch (error) {
        dispatch(getFailed(error.response.data));
      }
    };
  }

  const handleDonate = (currentDonations, donation) => {
    return async function (dispatch) {
      dispatch(donate());
      try {
        const donations = await _donate(currentDonations, donation);
        dispatch(donateSuccess(donations));
      } catch (error) {
        dispatch(donateFailed(error.response.data));
      }
    };
  }

  return {
    handleGetDonations,
    handleDonate,
  }
}


const _donationActions = initializeDonationActions();
