import React from 'react'
import { Card, Accordion, ListGroup } from 'react-bootstrap'

const Bottles = (props) => {

  const style = {
    width: '18rem'
  }

  return (
    <div>
      {props.bottles.map(bottle =>
        <Accordion key={bottle.id} style={style} className='float-left' >
          <Card >
            <Accordion.Toggle as={Card.Header} eventKey='0'>
              {bottle.beer.name}, {bottle.beer.brewery.name}, {bottle.beer.abv} %
            </Accordion.Toggle>
            <Accordion.Collapse eventKey='0'>
              <ListGroup>
                <ListGroup.Item>Bottles in stash {bottle.count}</ListGroup.Item>
                <ListGroup.Item>Price {bottle.price} ¢</ListGroup.Item>
                <ListGroup.Item>Volume {bottle.volume} litres</ListGroup.Item>
                <ListGroup.Item>Bottled {bottle.bottled}</ListGroup.Item>
                <ListGroup.Item>Expires {bottle.expiration}</ListGroup.Item>
              </ListGroup>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      )}
    </div>
  )
}

export default Bottles