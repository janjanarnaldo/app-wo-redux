'use strict';

const _Card = ({ animal }) => {
  const { id, type, name, dataPerdido, owner, ownerMobile, locality, amount } = animal;
  const { useRef, createElement: e } = React;
  const { addClass, humanizeDate, validDonation, getAnimalType } = commonUtilities;
  
  const { useLogin, useUi, useDonation } = hooks;
  const { idUser, isLoggedIn } = useLogin();
  const { handleLoading, handleLoadingTerminate, handleModalShow, handleModalTerminate } = useUi();
  const { donations, handleDonate } = useDonation();
  
  const { Input } = components;
  const doarModalInput = useRef(null);

  const animalType = getAnimalType(type);

  const renderTitle = () => e(
    'div',
    addClass('title'),
    e('div', addClass('layer')),
    e(
      'div',
      addClass('content'),
      e('span', null, `${name}(${animalType}) -- ${id}`),
      e('button', addClass('btn-style-1'), 'Partilhar'),
    ),
  );

  const renderPhoto = () => e(
    'div',
    addClass('photo'),
    e('img', {
      src: `http://placekitten.com/960/${id}`,
      alt: animalType,
    }),
  );
  
  const renderDetail = (title, description) => e(
    'div',
    addClass('detail'),
    e('p', null, title),
    e('p', null, description),
  )
    
  const renderDetails = () => e(
    'div',
    addClass('details'),
    renderDetail('Perdido', humanizeDate(dataPerdido)),
    renderDetail('Dono', owner),
    renderDetail('Localidade', locality),
  );

  const _handleSubmitDonation = (e) => {
    e.preventDefault();

    const { current: { value: doar }} = doarModalInput;

    if (!validDonation(doar)) {
      alert('Ooops, please enter a valid donation!')
    } else {
      (async () => {
        handleLoading('Donating...')
        const donation = { idAnimal: id, idUser, amount: parseInt(doar, 10) };
        await handleDonate(donations, donation);
        alert('Donation successfully saved!');
        handleModalTerminate();
        handleLoadingTerminate();
      })();
    }
  }

  const renderModalDonation = () => {
    return e(
      'div',
      addClass('vbox'),
      e(
        'h3',
        null,
        'Please enter amount',
      ),
      e(
        Input,
        { id: 'doar-amount', _ref: doarModalInput, placeholder: 'Maximum of $10.00' },
      )
    )
  }

  const renderDonation = () => e(
    'div',
    addClass('donation'),
    e(
      'span',
      null,
      e('b', null, isLoggedIn ? `$${parseFloat(amount).toFixed(2)} ` : '$0.00 '),
      'doados',
    ),
    e(
      'button',
      {
        ...addClass(`btn-style-2${!isLoggedIn || amount > 0 ? ' disabled': ''}`),
        id: 'btn-donation',
        onClick: () => {
          return handleModalShow(
            renderModalDonation(),
            _handleSubmitDonation,
          );
        },
      },
      'Doar',
    )
  );

  const renderCall = () => e(
    'a',
    {
      ...addClass('call'),
      href: `tel:${ownerMobile}`,
    },
    '(PHONE) LIGAR',
  );

  return e(
    'div',
    addClass('Card__root'),
    renderTitle(),
    renderPhoto(),
    renderDetails(),
    renderDonation(),
    renderCall(),
  )
}
