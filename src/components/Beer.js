import React from 'react'
import { Row, Col, Jumbotron, Container } from 'react-bootstrap'
import ResourceFeed from './ResourceFeed'

const Beer = ({ beer, ratings }) => {
  
  if (!beer) {
    return null
  }

  const ratingsToShow = ratings
    .filter(r => r.beer.id === beer.id)

  const showRatings = () =>
    <>
    <Row>
      <Col className='text-center'>
        <h3>Ratings</h3>
      </Col>
    </Row>
    <ResourceFeed resources={ratingsToShow} resource='rating' />
  </>

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>{beer.name} {beer.abv} %</h2>
          <h5>{beer.brewery.name}</h5>
        </Jumbotron>
      </Row>
      {ratingsToShow.length > 0
        ? showRatings()
        : <h4 className='text-center'>No ratings for this beer</h4>
      }
    </Container>
  )
}

export default Beer