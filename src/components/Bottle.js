import React from 'react'
import { Row, Col, Card, ListGroup, Badge } from 'react-bootstrap'

const Bottle = (props) => {
  const bottle = props.location.state.bottle

  return (
    <Row>
      <Col className='d-flex justify-content-center mb-2'>
      <Card >
        <Card.Header >
          <Card.Title>{bottle.beer.brewery.name} <br /> {bottle.beer.name}, {bottle.beer.abv} %</Card.Title>
          <Card.Subtitle><Badge variant='info' >{bottle.count}</Badge> bottles</Card.Subtitle>
        </Card.Header>
          <ListGroup variant='flush'>
            <ListGroup.Item>Price {bottle.price} ¢</ListGroup.Item>
            <ListGroup.Item>Volume {bottle.volume} litres</ListGroup.Item>
            <ListGroup.Item>Bottled {bottle.bottled}</ListGroup.Item>
            <ListGroup.Item>Expires {bottle.expiration}</ListGroup.Item>
          </ListGroup>
      </Card>
      </Col>
    </Row>
  )
}

export default Bottle