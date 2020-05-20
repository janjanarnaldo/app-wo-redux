'use strict';

const _UserDonations = () => {
  const { useEffect, createElement: e, Fragment } = React;
  const { useLogin, useDonation } = hooks;
  const { idUser } = useLogin();
  const { donations, handleGetDonations } = useDonation();
  const { addClass, humanizeDate } = commonUtilities;

  useEffect(() => {
    handleGetDonations(idUser);
  }, [idUser]);

  const renderDonations = () => {
    return donations.map(({ amount, dateCreated }, idx) => {
      return e(
        'ul',
        { key: idx },
        e(
          'li',
          null,
          'Donated ',
          e('b', null, `$${amount} `),
          `on ${humanizeDate(dateCreated)}`
        ),
      )
    })
  }

  return e(
    'div',
    addClass('UserDonations__root'),
    donations && donations.length ?
      e(Fragment, null, renderDonations()) :
      e('span', addClass('error'), 'No donations found'),
  );
}
