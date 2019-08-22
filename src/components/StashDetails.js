import React from 'react'
import { Col, Card } from 'react-bootstrap'

const StashDetails = ({ stash }) => {
  return (
    <Col>
      <Card>
        <Card.Header>
          <Card.Title>Click here to see details of your stash</Card.Title>
        </Card.Header>
        <Card.Body >
          <Card.Text>You have {stash.length} different beers in your stash</Card.Text>
          <Card.Text>You have {stash.reduce((sum, bottle) => sum + bottle.count, 0)} bottles in your stash</Card.Text>
          <Card.Text>Your stash costs {stash.reduce((sum, bottle) => sum + bottle.price, 0)}</Card.Text>
          <Card.Text>Your stash has {stash.reduce((sum, bottle) => sum + bottle.volume, 0)} beer</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default StashDetails