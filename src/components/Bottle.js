import React from 'react'
import { NavLink } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import moment from 'moment'

const Bottle = ({ bottle }) => {
  if (!bottle) {
    return null
  }

  return (
    <Card className='p-2 m-2 text-center'>
      <Card.Header>
        <Card.Title>{bottle.beer.brewery.name} </Card.Title>
        <Card.Subtitle>{bottle.beer.name}, {bottle.beer.abv} %</Card.Subtitle>
      </Card.Header>
      <Card.Footer>
        <small className='text-muted'>
          by <NavLink to={`/users/${bottle.user.id}/stash`} >{bottle.user.name}</NavLink>, {moment(bottle.added).fromNow()}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Bottle