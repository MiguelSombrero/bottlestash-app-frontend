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
        <Card.Title><NavLink to={`/beers/${bottle.beer.id}`} >{bottle.beer.name} {bottle.beer.abv} %</NavLink></Card.Title>
        <small className='text-left'>
          brewery: <NavLink to={`/breweries/${bottle.beer.brewery.id}`} >{bottle.beer.brewery.name}</NavLink>
        </small>
      </Card.Header>
      {bottle.picture &&
        <Card.Body>
          <Card.Img src={`/api/pictures/${bottle.picture}`} className='img-thumbnail' alt='' />
        </Card.Body>
      }
      <Card.Footer>
        <small className='text-muted'>
          added by <NavLink to={`/users/${bottle.user.id}/stash`} >{bottle.user.name}</NavLink>, {moment(bottle.added).fromNow()}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Bottle