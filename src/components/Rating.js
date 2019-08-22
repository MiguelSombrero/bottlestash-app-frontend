import React from 'react'
import { Card } from 'react-bootstrap'
import moment from 'moment'

const Rating = ({ rating }) => {
  return (
    <Card className='text-center p-2 m-2'>
      <Card.Header>
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
          by {rating.user.name}, {moment(rating.added).fromNow()}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default Rating