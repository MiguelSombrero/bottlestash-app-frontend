import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col, Jumbotron, Nav } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <>
      <Row>
        <Jumbotron className='text-center' as={Col}>
          <Nav className="justify-content-center mb-5">
            <Nav.Item>
              <NavLink to='/' >Home</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to='/' >Home</NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to='/' >Home</NavLink>
            </Nav.Item>
          </Nav>
        <p>&copy; Miika Somero 2019</p>
      </Jumbotron>
      </Row>
    </>
  )
}

export default Footer