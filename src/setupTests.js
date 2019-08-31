import '@testing-library/jest-dom/extend-expect'
import '@testing-library/react/cleanup-after-each'

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

const loggedUser = {
  id: '5d4bc0527958a42219ca2034',
  name: 'Miika Somero',
  username: 'Somero'
}

const user = {
  id: '5d4bc0527958a42219ca2034',
  name: 'Miika Somero',
  hidden: false,
  picture: '6d4bc0527958a42219ca2035'
}

const brewery = {
  id: '2d4bc0527958a42219ca2032',
  name: 'Sonnisaari',
  beers: [
    {
      id: '5d4bc0527958a42219ca2034',
      name: 'Sonnisaari Pils',
      abv: 5.6
    },
    {
      id: '1d4bc0527958a42219ca2034',
      name: 'Vattu',
      abv: 5.8
    },
    {
      id: '8d4bc0527958a42219ca2034',
      name: 'Mulkero',
      abv: 6.7
    }
  ]
}

const beer = {
  id: '5d4bc0527958a42219ca2034',
  name: 'Sonnisaari Pils',
  brewery,
  abv: 5.6,
  ratings: [
    '5d4bc0527958a42219ca2037',
    '5d4bc0527958a42219ca2038',
    '5d4bc0527958a42219ca2039'
  ]
}

const beer2 = {
  id: '5d4bc0557958a42219ca2034',
  name: 'Vattu',
  brewery,
  abv: 5.8,
  ratings: [
    '5d4bc0527958a42719ca2039'
  ]
}

const ratings = [
  {
    id: '5d4bc0527958a42219ca2037',
    aroma: 6,
    taste: 8,
    mouthfeel: 4,
    appearance: 4,
    overall: 17,
    added: new Date('08.29.2019').toISOString(),
    ageofbeer: 23,
    description: 'wery delicate taste, with hints of chocolate. Liked!',
    picture: '1d4bc0527958a42219ca2037',
    beer,
    user
  },
  {
    id: '5d4bc0527958a42219ca2038',
    aroma: 5,
    taste: 7,
    mouthfeel: 4,
    appearance: 3,
    overall: 14,
    added: new Date('02.01.2019').toISOString(),
    ageofbeer: 6,
    description: 'A bit alcoholy aftertaste. Light yellow body. Not too good.',
    beer,
    picture: '2d4bc0527958a42219ca2037',
    user
  },
  {
    id: '5d4bc0527958a42219ca2039',
    aroma: 8,
    taste: 8,
    mouthfeel: 5,
    appearance: 4,
    overall: 18,
    added: new Date().toISOString(),
    ageofbeer: 34,
    description: 'Best Imperial Stout I have ever tasted!',
    picture: '3d4bc0527958a42219ca2037',
    beer,
    user
  },
  {
    id: '5d4bc0527958a42719ca2039',
    aroma: 7,
    taste: 7,
    mouthfeel: 3,
    appearance: 4,
    overall: 14,
    added: new Date().toISOString(),
    ageofbeer: 11,
    description: 'Very good sour ale',
    beer2,
    user
  }
]

const bottle = {
  id: '4d5bc0527958a42219ca2037',
  count: 4,
  volume: 0.33,
  price: 4.89,
  bottled: new Date('2019-04-12'),
  expiration: new Date('2021-03-01'),
  added: new Date(),
  picture: '4d4bc0527958a42219ca2037',
  beer,
  user
}

const bottles = [
  {
    id: '4d5bc0527958a42219ca2037',
    count: 4,
    volume: 0.33,
    price: 4.89,
    bottled: new Date('2019-04-12'),
    expiration: new Date('2021-03-01'),
    added: new Date(),
    picture: '4d4bc0527958a42219ca2037',
    beer,
    user
  },
  {
    id: '4d5bc0527958a42219ca2036',
    count: 4,
    volume: 0.33,
    price: 4.89,
    bottled: new Date('2019-04-12'),
    expiration: new Date('2021-03-01'),
    added: new Date(),
    picture: '4d4bc0527958a42219ca2037',
    beer,
    user
  },
  {
    id: '4d5bc0527958a42219ca2035',
    count: 4,
    volume: 0.33,
    price: 4.89,
    bottled: new Date('2019-04-12'),
    expiration: new Date('2021-03-01'),
    added: new Date(),
    picture: '4d4bc0527958a42219ca2037',
    beer,
    user
  },
  {
    id: '4d5bc0527958a42219ca2034',
    count: 6,
    volume: 0.33,
    price: 4.89,
    bottled: new Date('2019-04-12'),
    expiration: new Date('2021-03-01'),
    added: new Date(),
    picture: '4d4bc0527958a42219ca2037',
    beer,
    user
  },
  {
    id: '4d5bc0527958a42219ca2033',
    count: 3,
    volume: 0.33,
    price: 4.89,
    bottled: new Date('2019-04-12'),
    expiration: new Date('2021-03-01'),
    added: new Date(),
    picture: '4d4bc0527958a42219ca2037',
    beer,
    user
  },
  {
    id: '4d5bc0527958a42219ca2032',
    count: 2,
    volume: 0.33,
    price: 5.89,
    bottled: new Date('2019-04-12'),
    expiration: new Date('2021-03-01'),
    added: new Date(),
    picture: '4d4bc0527958a42219ca2037',
    beer,
    user
  }
]

export default { loggedUser, user, beer, ratings, bottle, bottles }