import React from 'react'
import { Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

const Rating = ({ rating }) => {
  return (
    <Card className='text-center p-2 m-2'>
      <Card.Header style={{ backgroundColor: 'white', color: 'rgb(52, 58, 64)' }}>
        <Card.Title>{rating.beer.name}, {rating.beer.abv} %</Card.Title>
        <small>
          brewed by <NavLink to={`/breweries/${rating.beer.brewery.id}/`} >{rating.beer.brewery.name}</NavLink>
        </small>
      </Card.Header>
        {rating.picture &&
          <Card.Img src={`/api/pictures/${rating.picture}`} className='img-thumbnail' alt='' />
        }
      <Card.Body>
        <blockquote>
          {rating.description}
        </blockquote>
        <footer className="blockquote-footer">
          <cite>{rating.user.name}</cite>
        </footer>
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