import React, { useState } from 'react'
import { Row, Col, Jumbotron, Button, ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const Brewery = ({ brewery }) => {
  const [visibleBeers, setVisibleBeers] = useState(6)

  const handleVisibleBeers = () => {
    setVisibleBeers(visibleBeers + 6)
  }

  if (!brewery) {
    return null
  }

  return (
    <>
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
        <Col style={{ maxWidth: '35rem', margin: 'auto', textAlign: 'center' }}>
          <ListGroup variant='flush'>
            {brewery.beers.map(b =>
              <ListGroup.Item key={b.id}>
                  <NavLink to={`/beers/${b.id}`} >{b.name}, {b.abv} %</NavLink>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-5'>
          {brewery.beers.length > visibleBeers &&
            <Button onClick={handleVisibleBeers}>Load more ...</Button>
          }
    </Col>
  </Row>
  </>
  )
}

export default Brewery