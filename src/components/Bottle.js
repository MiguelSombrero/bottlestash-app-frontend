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
      <Card.Header style={{ backgroundColor: 'rgb(52, 58, 64)', color: 'rgb(255, 172, 65)' }}>
        <Card.Title>{bottle.beer.brewery.name} </Card.Title>
        <Card.Subtitle>{bottle.beer.name}, {bottle.beer.abv} %</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        {bottle.picture &&
          <Card.Img src={`/api/pictures/${bottle.picture}`} className='img-thumbnail' alt='' />
        }
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>
          by <NavLink to={`/users/${bottle.user.id}/stash`} >{bottle.user.name}</NavLink>, {moment(bottle.added).fromNow()}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Bottle