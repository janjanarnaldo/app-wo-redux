'use strict';

const _LostAndFoundPets = () => {
  const { createElement: e, Fragment, useState, useEffect, useRef } = React;
  const { addClass, debounce } = commonUtilities;

  const { Input, Card } = components;

  const { useAnimal, useUi, useLogin, useDonation } = hooks;

  const { handleGetAnimals, animals } = useAnimal();
  const { handleLoading, handleLoadingTerminate } = useUi();
  const { idUser } = useLogin();
  const { donations } = useDonation();

  const [currentPage, setCurrentPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState({ region: '', dateLost: 1, petName: undefined, readFilter: false });

  const filterByRegionInput = useRef(null);
  const filterByDateLostDropdown = useRef(null);
  const filterByPetNameDropdown = useRef(null);

  const MAX_PETS_PER_PAGE = 6;

  const _getAnimals = async () => {
    handleLoading('Loading lost pets...')
    await handleGetAnimals(donations.length ? donations : null, idUser, filter);
    handleLoadingTerminate();
  }

  useEffect(() => {
    _getAnimals();
  }, [idUser, donations]);

  useEffect(() => {
    if (animals) {
      setCards(animals.map(animal => renderCard(animal)));
      setCurrentPage(1);
    }
  }, [animals]);

  useEffect(() => {
    console.log(filter);
    if (!filter.readFilter) return;

    _getAnimals();
  }, [filter]);

  const _handleFilterChange = (updatedFilter) => {
    setFilter({ ...filter, ...updatedFilter, readFilter: true });
  }

  const renderTitle = e('h5', addClass('LostAndFoundPets__title'), 'Lost and Found Pets');

  const renderOption = (title, field) => e(
    'div',
    addClass('field-container vbox'),
    e('span', null, title),
    field,
  )

  const filterField = renderOption(
    'Filter by region (comma separated)',
    e(
      Input,
      {
        ...addClass('LostAndFoundPets__filter'),
        placeholder: 'Region',
        _ref: filterByRegionInput,
        onChange: () => _handleFilterChange({ region: filterByRegionInput.current.value }),
      }
    ),
  );

  const dateLostField = renderOption(
    'Order by date lost',
    e(
      'select',
      {
        ...addClass('LostAndFoundPets__order'),
        ref: filterByDateLostDropdown,
        onChange: () => _handleFilterChange({
          dateLost: parseInt(filterByDateLostDropdown.current.value, 10),
          petName: null,
        }),
      },
      e('option', { value: 1 }, 'Newest'),
      e('option', { value: 0 }, 'Oldest'),
    ),
  );

  const petNameField = renderOption(
    'Order by pet name',
    e(
      'select',
      {
        ...addClass('LostAndFoundPets__order'),
        ref: filterByPetNameDropdown,
        onChange: () => _handleFilterChange({
          petName: parseInt(filterByPetNameDropdown.current.value, 10),
          dateLost: null,
        }),
      },
      e('option', { value: 1 }, 'A - Z'),
      e('option', { value: 0 }, 'Z - A'),
    ),
  );

  const renderOptions = e(
    'div',
    addClass('hbox cross-center LostAndFoundPets__options'),
    filterField,
    dateLostField,
    petNameField,
  );

  const renderCard = (animal) => e(
    'div',
    {
      ...addClass('LostAndFoundPets__card'),
      key: animal.id,
    },
    e(Card, { animal }),
  );


  const maxRenderCardIdx = MAX_PETS_PER_PAGE * currentPage;
  const minRenderCardIdx = maxRenderCardIdx - MAX_PETS_PER_PAGE;

  const renderCards = e(
    'div',
    addClass('LostAndFoundPets__cards'),
    ...cards.filter((card, idx) => {
      return idx >= minRenderCardIdx && idx < maxRenderCardIdx;
    }),
  );

  const renderPagination = e(
    _Pagination,
    {
      totalItems: cards.length,
      currentPage,
      itemsPerPage: MAX_PETS_PER_PAGE,
      setCurrentPage,
    },
  )

  const render = () => {
    return e(
      Fragment,
      null,
      renderTitle,
      renderOptions,
      renderCards,
      renderPagination,
    )
  }

  return e(
    'div',
    addClass('LostAndFoundPets__root'),
    render(),
  )
};
