'use strict';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const ANIMAL_TYPES = {
  1: 'cat',
  2: 'dog',
  3: 'other',
}

const commonUtilities = {
  noop: () => {},
  fakeLogin: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username !== '' && password !== '') {
          resolve('Logged in');
        } else {
          reject({ response: { data: 'Both Username and List name are required!' }});
        }
      }, 1000);
    });
  },
  humanizeDate: ({ year, month, day }) => {
    const date = [
      MONTHS[month - 1],
      day ? `${day},` : undefined,
      year,
    ];
    return date.join(' ');
  },
  dateObject: ({ year, month, day = 1 }) => {
    return new Date(`${year}-${month}-${day}`);
  },
  getDonations: idUser => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const donation = USER_DONATIONS.find(d => d.idUser === idUser);
        if (donation) {
          resolve(donation.donations);
        } else {
          reject({ response: { data: 'No donations found from this user!' } });
        }
      }, 1000);
    });
  },
  getAnimals: (donations, idUser, filter) => {
    const { region, dateLost, petName } = filter;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let mapDonatedAmountPerAnimal = {};
        if (idUser) {
          const donation = donations ? { donations } : (USER_DONATIONS.find(d => d.idUser === idUser) || {});
          mapDonatedAmountPerAnimal = donation.donations.reduce((accum, current) => {
            accum[current.idAnimal] = current.amount;
            return accum;
          }, {});
        }

        let filterAnimals = [...ANIMALS];

        if (region) {
          filterAnimals = filterAnimals.filter(animal => animal.locality.includes(region));
        }
        
        if (dateLost !== undefined && dateLost !== null) {
          filterAnimals = filterAnimals.slice().sort((a, b) => {
            return commonUtilities.dateObject(b.dataPerdido) - commonUtilities.dateObject(a.dataPerdido);
          });

          if (!dateLost) {
            filterAnimals = filterAnimals.reverse();
          }
        }

        if (petName !== undefined && petName !== null) {
          filterAnimals = filterAnimals.slice().sort((a, b) => {
            const aName = a.name.toLowerCase();
            const bName = b.name.toLowerCase();
            return (aName < bName) ? -1 : (aName > bName) ? 1 : 0;
          });

          if (!petName) {
            filterAnimals = filterAnimals.reverse();
          }
        }

        const animals = filterAnimals.map(animal => ({ ...animal, amount: mapDonatedAmountPerAnimal[animal.id] || 0 }));

        if (animals) {
          resolve(animals);
        } else {
          reject({ response: { data: 'No lost animals found!' } });
        }
      }, 1000);
    });
  },
  getAnimalType: (type) => {
    return ANIMAL_TYPES[type] || 'Type not found';
  },
  validDonation: (donation) => {
    return (donation && !isNaN(donation) && donation < 10);
  },
  donate: (donations, { idAnimal, idUser, amount }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = donations[donations.length - 1].id + 1;
        const date = new Date();
        const dateCreated = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };

        if (idAnimal && idUser && amount) {
          resolve([ ...donations, { id,idAnimal, idUser, amount, dateCreated } ]);
        } else {
          reject({ response: { data: 'There is an error on the donation' } });
        }
      }, 1000);
    });
  },
  addClass: className => ({ className }),
}

