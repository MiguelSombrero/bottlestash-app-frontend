import React from 'react'
import { connect } from 'react-redux'
import { Card, ListGroup } from 'react-bootstrap'

const Stash = (props) => {
  return (
    <div>
      <h2>Your bottlestash</h2>

      {props.user.stash && props.user.stash.map(bottle =>
        <Card>
          <Card.Header>{bottle.beer.name}, {bottle.beer.brewery}, {bottle.beer.abv}</Card.Header>
            <ListGroup>
              <ListGroup.Item>Number of bottles in stash {bottle.count}</ListGroup.Item>
              <ListGroup.Item>Price {bottle.price}</ListGroup.Item>
              <ListGroup.Item>Volume {bottle.volume}</ListGroup.Item>
              <ListGroup.Item>Bottled {bottle.bottled}</ListGroup.Item>
              <ListGroup.Item>Expires {bottle.expiration}</ListGroup.Item>
            </ListGroup>
        </Card>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Stash)