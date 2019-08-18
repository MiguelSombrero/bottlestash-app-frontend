import React, { useState } from 'react'
import { Card } from 'react-bootstrap'

const Bottle = ({ bottle }) => {
  const [hovered, setHovered] = useState(false)

  if (!bottle) {
    return null
  }

  const onHover = {
    transform: 'scale(1.02)',
    transition: 'transform .3s',
    border: '1px solid whitesmoke',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }

  return (
    <Card
      className='p-2 m-2 text-center'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={hovered ? onHover : null}
    >
      <Card.Header>
        <Card.Title>{bottle.beer.brewery.name} </Card.Title>
        <Card.Subtitle>{bottle.beer.name}, {bottle.beer.abv} %</Card.Subtitle>
      </Card.Header>
      <Card.Body>
        <Card.Text>
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        Added by {bottle.user.name} {bottle.added}
      </Card.Footer>
    </Card>
  )
}

export default Bottle