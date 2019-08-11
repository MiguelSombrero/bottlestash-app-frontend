
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (message, type='success') => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { message, type }
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, 4000)
  }
}

export default notificationReducer