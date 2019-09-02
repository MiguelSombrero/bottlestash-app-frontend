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
  token: '5d4bc0527958a42219ca2034',
  name: 'Miika Somero',
  username: 'Somero'
}

const loggedUser2 = {
  token: '5d4bc0537758a42219ca2034',
  name: 'Matti Luukkainen',
  username: 'Luukkainen'
}

const user = {
  id: '5d4bc0527958a42219ca2034',
  name: 'Miika Somero',
  hidden: false,
  picture: '6d4bc0527958a42219ca2035'
}

const user2 = {
  id: '5d4bc0527958a42629ca2034',
  name: 'Matti Luukkainen',
  hidden: true
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

const rating = {
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
}

const ratings = [
  {
    id: '5d4bc0527958a42219ca2037',
    aroma: 6,
    taste: 8,
    mouthfeel: 4,
    appearance: 4,
    overall: 17,
    added: new Date().toISOString(),
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
    added: new Date().toISOString(),
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
    beer: beer2,
    user
  },
  {
    id: '5d4bc0527958a42719ca1029',
    aroma: 4,
    taste: 4,
    mouthfeel: 2,
    appearance: 3,
    overall: 9,
    added: new Date().toISOString(),
    ageofbeer: 4,
    description: 'Hyi! Melko imelää',
    beer: beer2,
    user: user2
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
  },
  {
    id: '4d1bc0527958a42219ca2032',
    count: 6,
    volume: 0.5,
    price: 4.89,
    bottled: new Date('2019-04-12'),
    expiration: new Date('2021-03-01'),
    added: new Date(),
    beer,
    user: user2
  }
]

const userToview = {
  id: '5d4bc0527958a42219ca2034',
  username: 'Somero',
  name: 'Miika Somero',
  hidden: false,
  stash: [
    {
      id: '4d5bc0527958a42219ca2032',
      count: 2,
      volume: 0.33,
      price: 5.89,
      bottled: new Date('2018-04-12'),
      expiration: new Date('2019-03-01'),
      added: new Date(),
      picture: '4d4bc0527958a42219ca2037',
      beer,
      user: '5d4bc0527958a42219ca2034'
    },
    {
      id: '4d1bc0527958a42219ca2032',
      count: 6,
      volume: 0.5,
      price: 4.89,
      bottled: new Date('2018-02-12'),
      expiration: new Date('2024-03-01'),
      added: new Date(),
      beer: beer2,
      user: '5d4bc0527958a42219ca2034'
    }
  ]
}

const userToview2 = {
  id: '5d4bc0527958a42219ca2634',
  username: 'Luukkainen',
  name: 'Matti Luukkainen',
  hidden: true,
  stash: [
    {
      id: '4d5bc0527958a42219ca2032',
      count: 2,
      volume: 0.33,
      price: 5.89,
      bottled: new Date('2018-04-12'),
      expiration: new Date('2019-03-01'),
      added: new Date(),
      picture: '4d4bc0527958a42219ca2037',
      beer,
      user: '5d4bc0527958a42219ca2034'
    },
    {
      id: '4d1bc0527958a42219ca2032',
      count: 6,
      volume: 0.5,
      price: 4.89,
      bottled: new Date('2018-02-12'),
      expiration: new Date('2024-03-01'),
      added: new Date(),
      beer: beer2,
      user: '5d4bc0527958a42219ca2034'
    }
  ]
}

export default {
  loggedUser,
  loggedUser2,
  user,
  beer,
  ratings,
  bottle,
  bottles,
  brewery,
  rating,
  userToview,
  userToview2
}