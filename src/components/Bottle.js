import React from 'react'
import { Card, ListGroup, Badge, Button, ButtonGroup, Accordion } from 'react-bootstrap'

const Bottle = ({ bottle }) => {

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
        <Button variant='light'>Just drink!</Button>
      </ButtonGroup>
      <Card.Footer><Badge variant='info' >{bottle.count}</Badge> bottles left</Card.Footer>
    </Card>
   
  )
}

export default Bottle