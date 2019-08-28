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

  const ratingsToShow = ratings
    .filter(r => r.beer.id === beer.id)

  const showBeer = () =>
    <>
    <Row>
      <Col className='text-center'>
        <h3>Ratings</h3>
      </Col>
    </Row>
    <Row>
      <Col className='maindiv'>
        {ratingsToShow.map(r =>
          <Rating key={r.id} rating={r} ></Rating>
        )}
      </Col>
    </Row>
    <Row>
      <Col className='d-flex justify-content-center mb-5'>
        {ratingsToShow.length > visibleRatings &&
          <Button onClick={handleVisibleRatings}>Load more ...</Button>
        }
      </Col>
    </Row>
  </>

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>{beer.name} {beer.abv} %</h2>
          <h5>{beer.brewery.name}</h5>
        </Jumbotron>
      </Row>
      {ratingsToShow.length > 0
        ? showBeer()
        : <h4 className='text-center'>No ratings for this beer</h4>
      }
    </>
  )
}

export default Beer