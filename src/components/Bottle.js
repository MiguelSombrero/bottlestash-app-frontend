import React, { useState } from 'react'
import { Card, ListGroup, Badge, Button, ButtonGroup } from 'react-bootstrap'
import { updateUser } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { removeBottle, updateBottle } from '../reducers/bottlesReducer'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

const Bottle = (props) => {
  const [hovered, setHovered] = useState(false)
  const bottle = props.bottle

  const handleDrink = async () => {
    try {
      const updateableBottle = { ...bottle,
        beer: bottle.beer.id,
        count: bottle.count - 1
      }
      
      if (bottle.count < 2) {
        await props.removeBottle(bottle.id)
        props.setNotification(`This was your last bottle of ${bottle.brewery}, ${bottle.name}`)
      } else {
        await props.updateBottle(bottle.id, updateableBottle)
        props.setNotification(`You drinked one bottle of ${bottle.brewery}, ${bottle.name}`)
      }
      
      await props.updateUser(props.user.username)
      
    } catch (exception) {
      props.setNotification('Bottle update failed!', 'error')
    }
  }

  const onHover = {
    border: '1px solid red',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }

  const notHovered = {
    border: '1px solid whitesmoke'
  }

  return (
    <Card className='p-2 m-2' onMouseLeave={() => setHovered(false)} onMouseEnter={() => setHovered(true)} style={hovered ? onHover : notHovered} >
      <Card.Header>
        <Card.Title>{bottle.beer.brewery.name} </Card.Title>
        <Card.Subtitle>{bottle.beer.name}, {bottle.beer.abv} %</Card.Subtitle>
      </Card.Header>
     
      <ListGroup variant='flush'>
        <ListGroup.Item><small>Price {bottle.price} ¢</small></ListGroup.Item>
        <ListGroup.Item><small>Volume {bottle.volume} litres</small></ListGroup.Item>
        <ListGroup.Item><small>Bottled {bottle.bottled}</small></ListGroup.Item>
        <ListGroup.Item><small>Expires {bottle.expiration}</small></ListGroup.Item>
      </ListGroup>
      <ButtonGroup className='p-2'>
        <NavLink to={{ pathname: '/rate', state: { bottle }}} onClick={handleDrink} >Drink and rate!</NavLink>
        <Button onClick={handleDrink} variant='light'>Just drink!</Button>
      </ButtonGroup>
      <Card.Footer><Badge variant='info' >{bottle.count}</Badge> bottles left</Card.Footer>
    </Card>
  )
}

const mapDispatchToProps = {
  removeBottle,
  updateBottle,
  updateUser,
  setNotification
}

export default connect(null, mapDispatchToProps)(Bottle)