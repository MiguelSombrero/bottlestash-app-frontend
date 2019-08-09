import React from 'react'
import { Card, ListGroup, CardColumns, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Bottles = (props) => {

  return (
    <>
      <CardColumns >
        {props.bottles.map(bottle =>
          <Card key={bottle.id} className='p-2 m-2' >
            <Card.Header >
              <Link to={{ pathname: `/bottles/${bottle.id}`, state: { bottle } }}>
                <Card.Title>{bottle.beer.brewery.name} <br /> {bottle.beer.name}, {bottle.beer.abv} %</Card.Title>
              </Link>
              <Card.Subtitle><Badge variant='info' >{bottle.count}</Badge> bottles</Card.Subtitle>
            </Card.Header>
            <ListGroup variant='flush'>
              <ListGroup.Item>Price {bottle.price} ¢</ListGroup.Item>
              <ListGroup.Item>Volume {bottle.volume} litres</ListGroup.Item>
              <ListGroup.Item>Bottled {bottle.bottled}</ListGroup.Item>
              <ListGroup.Item>Expires {bottle.expiration}</ListGroup.Item>
            </ListGroup>
          </Card>
        )}
      </CardColumns>
    </>
  )
}

export default Bottles