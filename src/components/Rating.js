import React from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const Rating = ({ rating }) => {
  return (
    <Card className='text-center p-2 m-2'>
      <Card.Header style={{ backgroundColor: 'rgb(52, 58, 64)', color: 'rgb(255, 172, 65)' }}>
        <Card.Title>{rating.beer.brewery.name}</Card.Title>
        <Card.Subtitle>{rating.beer.name}, {rating.beer.abv} %</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <blockquote>
          {rating.description}
        </blockquote>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>
          by <NavLink to={`/users/${rating.user.id}/stash`} >{rating.user.name}</NavLink>, {moment(rating.added).fromNow()}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Rating