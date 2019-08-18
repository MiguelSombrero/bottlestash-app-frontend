import React from 'react'
import { Card } from 'react-bootstrap'

const Rating = ({ rating }) => {
  return (
    <Card className='p-2 m-2'>
      <Card.Header>
        <Card.Title>{rating.beer.brewery.name}, {rating.beer.name}, {rating.beer.abv}%</Card.Title>
        <Card.Subtitle>rated by {rating.user.name}, {rating.rated}</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>{rating.description}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Rating