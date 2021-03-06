import React from 'react'
import { Col, Card, ListGroup } from 'react-bootstrap'

const StashDetails = ({ stash }) => {

  const bottlesCount = stash.reduce((sum, bottle) => sum + bottle.count, 0)
  const stashCost = stash.reduce((sum, bottle) => sum + bottle.price, 0)
  const stashVolume = stash.reduce((sum, bottle) => sum + bottle.volume, 0)

  return (
    <Col className='maindiv'>
      <Card>
        <Card.Header>
          <Card.Title>Details of your stash</Card.Title>
        </Card.Header>
        <ListGroup variant='flush'>
          <ListGroup.Item>{bottlesCount} bottles in your stash</ListGroup.Item>
          <ListGroup.Item>{stash.length} different beers</ListGroup.Item>
          <ListGroup.Item>Your stash costs {stashCost.toFixed(2)} &euro;</ListGroup.Item>
          <ListGroup.Item>Your stash has {stashVolume.toFixed(2)} litres of beer</ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  )
}

export default StashDetails