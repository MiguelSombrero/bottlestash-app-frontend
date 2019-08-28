import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Rating from './Rating'

const Ratings = (props) => {
  const [visibleRatings, setVisibleRatings] = useState(5)
    
  const handleSetVisibleRatings = () => {
    setVisibleRatings(visibleRatings + 5)
  }

  const ratingsToShow = props.ratings.slice(0, visibleRatings)
  
  return (
    <>
      <Row>
        <Col className='maindiv'>
          {ratingsToShow.map(r =>
            <Rating key={r.id} rating={r} ></Rating>
          )}
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          {ratingsToShow.length > visibleRatings &&
            <Button onClick={handleSetVisibleRatings}>Load more ...</Button>
          }
        </Col>
      </Row>
    </>
  )
}

export default Ratings