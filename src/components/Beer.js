import React, { useState } from 'react'
import { Row, Col, Jumbotron, Button } from 'react-bootstrap'
import Rating from './Rating'

const Beer = ({ beer, ratings }) => {
  const [visibleRatings, setVisibleRatings] = useState(6)

  const handleVisibleRatings = () => {
    setVisibleRatings(visibleRatings + 6)
  }

  if (!beer) {
    return null
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>{beer.name} {beer.abv} %</h2>
          <h5>{beer.brewery.name}</h5>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='text-center'>
          <h3>Ratings</h3>
        </Col>
      </Row>
      <Row>
        <Col style={{ maxWidth: '35rem', margin: 'auto', textAlign: 'center' }}>
          {ratings.filter(r => r.beer.id === beer.id).map(r =>
            <Rating key={r.id} rating={r} ></Rating>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-5'>
          {beer.ratings.length > visibleRatings &&
            <Button onClick={handleVisibleRatings}>Load more ...</Button>
          }
    </Col>
  </Row>
  </>
  )
}

export default Beer