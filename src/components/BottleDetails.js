import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { updateUserToState } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeBottle, updateBottle } from '../reducers/bottlesReducer'
import { connect } from 'react-redux'

const BottleDetails = (props) => {
  if (!props.bottle) {
    return null
  }
  
  const bottle = props.bottle

  const handleDrink = async () => {
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
          
    } catch (exception) {
      props.setNotification('Bottle update failed!', 'error')
    }
  }
    
  return (
    <Modal centered show={props.visible} onHide={props.toggleVisibility}>
      <Modal.Header closeButton>
        <Modal.Title>{bottle.beer.brewery.name}, {bottle.beer.name}, {bottle.beer.abv} %</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Price {bottle.price} &euro;</p>
        <p>Volume {bottle.volume} litres</p>
        <p>Bottled {bottle.bottled}</p>
        <p>Expires {bottle.expiration}</p>
        <p>You have {bottle.count} bottles left</p>
      </Modal.Body>
      <Modal.Footer>
        <NavLink onClick={handleDrink} to={{ pathname: '/rate', state: { bottle }}} >Drink and rate!</NavLink>
        <Button onClick={handleDrink} variant='light'>Just drink!</Button>
      </Modal.Footer>
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