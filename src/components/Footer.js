import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col, Jumbotron, Nav } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <Jumbotron className='mt-5' style={{ backgroundColor: 'whitesmoke', color: 'black' }}>
      <Row>
        <Col>
          <Nav className='justify-content-center'>
            <Nav.Link as='span'>
              <NavLink to='/' >Home</NavLink>
            </Nav.Link>
            <Nav.Link as='span'>
              <NavLink to='/about' >About</NavLink>
            </Nav.Link>
            <Nav.Link href='https://github.com/MiguelSombrero/bottlestash-app-backend'>Github</Nav.Link>
          </Nav>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col className='text-center'>
          <p>&copy; Miika Somero 2019</p>
        </Col>
      </Row>
    </Jumbotron>
  )
}

export default Footer