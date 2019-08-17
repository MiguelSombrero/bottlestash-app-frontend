import React, { useState } from 'react'
import { Card, Badge } from 'react-bootstrap'
import BottleDetails from './BottleDetails'

const Bottle = ({ bottle, user }) => {
  const [hovered, setHovered] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  if (!bottle) {
    return null
  }

  const onHover = {
    width: '20rem',
    transform: 'scale(1.1)',
    transition: 'transform .2s',
    border: '1px solid whitesmoke',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }

  const notHovered = {
    width: '20rem',
    border: '1px solid light-grey'
  }

  return (
    <>
      <Card
        className='p-2 m-2'
        onClick={() => setShowDetails(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={hovered ? onHover : notHovered}
      >
        <Card.Header>
          <Card.Title>{bottle.beer.brewery.name} </Card.Title>
          <Card.Subtitle>{bottle.beer.name}, {bottle.beer.abv} %</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Expiration day is {bottle.expiration || '-'}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Badge variant='info' >{bottle.count}</Badge> bottles left
        </Card.Footer>
      </Card>
      <BottleDetails show={showDetails} setShow={setShowDetails} bottle={bottle} user={user} ></BottleDetails>
    </>
  )
}

export default Bottle