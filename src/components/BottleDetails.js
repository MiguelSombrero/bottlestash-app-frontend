import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { updateUserToState } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeBottle, updateBottle } from '../reducers/bottlesReducer'
import { connect } from 'react-redux'
import moment from 'moment'

const BottleDetails = (props) => {

  if (!props.bottle) {
    return null
  }

  const bottle = props.bottle

  const handleDrink = async (needClosing) => {
    try {
      const updateableBottle = { ...bottle,
        beer: bottle.beer.id,
        count: bottle.count - 1
      }

      if (bottle.count < 2) {
        await props.removeBottle(bottle.id)
        props.setNotification(`This was your last bottle of ${bottle.beer.name}`)
      } else {
        await props.updateBottle(bottle.id, updateableBottle)
        props.setNotification(`You drinked one bottle of ${bottle.beer.brewery.name} ${bottle.beer.name}`)
      }
    
      props.updateUserToState(props.user.username)

      if (needClosing) {
        props.toggleVisibility()
      }
          
    } catch (exception) {
      props.setNotification('Bottle update failed!', 'error')
    }
  }
    
  return (
    <Modal className='text-center' centered show={props.visible} onHide={props.toggleVisibility}>
      <Modal.Header closeButton>
        <Modal.Title >{bottle.beer.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Alcohol: {bottle.beer.abv} %</p>
        <p>Brewery: {bottle.beer.brewery.name}</p>
        <p>Price: {bottle.price ? bottle.price : '-'} &euro;</p>
        <p>Volume: {bottle.volume} litres</p>
        <p>Bottled: {bottle.bottled ? moment(bottle.bottled).format('DD.MM.YYYY') : '-'}</p>
        <p>Expires: {bottle.expiration ? moment(bottle.expiration).format('DD.MM.YYYY') : '-'}</p>
        <p>Beers age: {bottle.bottled ? moment(new Date()).diff(moment(bottle.bottled), 'months') : '-'} months</p>
        <p>Bottles: {bottle.count}</p>
      </Modal.Body>

      {props.user.username === props.userToView.username &&
        <Modal.Footer>
          <NavLink className='btn' onClick={() => handleDrink(false)} to={{ pathname: '/rate', state: { bottle }}} >Drink and rate</NavLink>
          <Button onClick={() => handleDrink(true)} variant='light'>Just drink</Button>
        </Modal.Footer>
      }
    </Modal>
  )
}

const mapDispatchToProps = {
  removeBottle,
  updateBottle,
  updateUserToState,
  setNotification
}  

export default connect(null, mapDispatchToProps)(BottleDetails)