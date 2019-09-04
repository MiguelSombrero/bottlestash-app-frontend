import React from 'react'
import { Row, Col, Jumbotron, Container, Badge } from 'react-bootstrap'
import ResourceFeed from './ResourceFeed'

const Beer = ({ beer, ratings }) => {
  
  if (!beer) {
    return null
  }

  const score = (r) => r.overall + r.aroma + r.taste + r.mouthfeel + r.appearance
  const average = () => ratings.reduce((sum, r) => sum + score(r), 0) / ratings.length

  const showRatings = () =>
    <>
    <Row className='mb-4'>
      <Col className='text-center'>
        <h6>{ratings.length} ratings with average score <Badge variant='secondary'>{average().toFixed(1)}/50</Badge></h6>
      </Col>
    </Row>
    <Row>
      <Col className='text-center'>
        <h3>Ratings</h3>
      </Col>
    </Row>
    <ResourceFeed resources={ratings} resource='rating' />
  </>

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>{beer.name} {beer.abv} %</h2>
          <h5>{beer.brewery.name}</h5>
        </Jumbotron>
      </Row>
      {ratings.length > 0
        ? showRatings()
        : <h6 className='text-center'>No ratings for this beer</h6>
      }
    </Container>
  )
}

export default Beer