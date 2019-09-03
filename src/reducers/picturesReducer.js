import { useResource } from '../hooks'

const picturesService = useResource('/api/pictures')

/**
 * This is not exactly "reducer" because nothing goes to state
 * This is more like a "service"
 * Although for the unity, fetching a pictures is also implemented
 * in reducer, as fetching the other resources
 */
  
export const getOnePicture = id => {
  return async dispatch => {
    const picture = await picturesService.getOne(id)
  }
}
  
export const addPicture = newPicture => {
  return async dispatch => {
    const data = new FormData()
    data.append('picture', newPicture)
    const picture = await picturesService.createImage(data)
    return picture
  }
}
