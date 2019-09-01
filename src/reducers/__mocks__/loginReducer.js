import helper from '../../setupTests'

const loginUser = (credentials) => {
  window.localStorage.setItem('loggedBottlestashUser', JSON.stringify(helper.loggedUser))
  return Promise.resolve(helper.loggedUser)
}

export default { loginUser }