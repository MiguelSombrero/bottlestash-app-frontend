
// voi olla että tätä reduceria ei tarvita
// jos käyttäjä lisää pullon, se pitää lisätä käyttäjän tilaan
// voi olla hyvä, että pulloja ei löydy tilasta
// käyttäjällä on tieto 'hidden' joka kertoo, saako pulloa näyttää muille

const bottlesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BOTTLE':
      return [...state, state.bottle ]
    default:
      return state
  }
}

export const addBottle = bottle => {
  return {
    type: 'ADD_BOTTLE',
    bottle
  }
}

export default bottlesReducer