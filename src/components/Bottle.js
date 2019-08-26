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
      <Card.Header style={{ backgroundColor: 'white', color: 'rgb(52, 58, 64)' }}>
        <Card.Title>{bottle.beer.name}, {bottle.beer.abv} %</Card.Title>
        <small>
          brewed by <NavLink to={`/breweries/${bottle.beer.brewery.id}/`} >{bottle.beer.brewery.name}</NavLink>
        </small>
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