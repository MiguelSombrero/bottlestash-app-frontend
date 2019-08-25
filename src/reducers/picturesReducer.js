import { useResource } from '../hooks'

const picturesService = useResource('/api/pictures')

const picturesReducer = (state = [], action) => {
    switch (action.type) {
      case 'GET_PICTURE':
        return [...state, action.picture ]
      default:
        return state
    }
  }
  
  export const getOnePicture = id => {
    return async dispatch => {
      const picture = await picturesService.getOne(id)
      
      dispatch({
        type: 'GET_PICTURE',
        picture
      })
    }
  }
  
  export const addPicture = newPicture => {
    return async dispatch => {
      const picture = await picturesService.createImage(newPicture)
      return picture
    }
  }

  export default picturesReducer