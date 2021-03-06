import React from 'react'
import { Row, Col, Jumbotron, ListGroup, Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Brewery = ({ brewery }) => {
  
  if (!brewery) {
    return null
  }

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>{brewery.name}</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='text-center'>
          <h3>Beers</h3>
        </Col>
      </Row>
      <Row>
        <Col className='maindiv'>
          <ListGroup variant='flush'>
            {brewery.beers.map(b =>
              <ListGroup.Item key={b.id}>
                  <NavLink to={`/beers/${b.id}`} >{b.name} {b.abv} %</NavLink>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default Brewery