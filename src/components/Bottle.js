import React from 'react'
import { Card, ListGroup, Badge, Button, ButtonGroup } from 'react-bootstrap'
import bottlesService from '../services/bottles'
import { updateUser } from '../reducers/usersReducer'
import { connect } from 'react-redux'

const Bottle = (props) => {
  const bottle = props.bottle

  const handleDrink = async () => {
    try {
      const updateableBottle = { ...bottle,
        beer: bottle.beer.id,
        count: bottle.count - 1
      }
      
      if (bottle.count < 2) {
        await bottlesService.remove(bottle.id)
        props.setNotification(`This was your last bottle of ${bottle.brewery}, ${bottle.name}`)
      } else {
        await bottlesService.update(bottle.id, updateableBottle)
        props.setNotification(`You drinked one bottle of ${bottle.brewery}, ${bottle.name}`)
      }
      
      await props.updateUser(props.user.username)
      
    } catch (exception) {
      props.setNotification('Bottle update failed!', 'error')
    }
  }

  return (
    <Card className='p-2 m-2'>
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
        <Button variant='light'>Drink and rate!</Button>
        <Button onClick={handleDrink} variant='light'>Just drink!</Button>
      </ButtonGroup>
      <Card.Footer><Badge variant='info' >{bottle.count}</Badge> bottles left</Card.Footer>
    </Card>
  )
}

const mapDispatchToProps = {
  updateUser
}

export default connect(null, mapDispatchToProps)(Bottle)