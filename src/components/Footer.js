import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row, Col, Jumbotron, Nav } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <Row>
      <Jumbotron className='text-center d-flex justify-content-center mb-5' as={Col}>
        <Nav>
          <Nav.Item><NavLink to='/' >Home</NavLink></Nav.Item>
          <Nav.Item><NavLink to='/about' >about</NavLink></Nav.Item>
          <Nav.Item><NavLink to='/github' >Github</NavLink></Nav.Item>
        </Nav>
        <p>&copy; Miika Somero 2019</p>
      </Jumbotron>
    </Row>
  )
}

export default Footer