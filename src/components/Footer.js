import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = (props) => {
  return (
    <>
      <Row className='mt-5' style={{ textAlign: 'center', backgroundColor: 'rgba(255, 172, 65, 0.8)' }}>
        <Col className='col-2' style={{ margin: 'auto'}}>
          <p>Tähän tietoja</p>
        </Col>
        <Col className='col-2' style={{ margin: 'auto'}}>
          <p>Tähän tietoja</p>
        </Col>
        <Col className='col-2' style={{ margin: 'auto'}}>
          <p>Tähän tietoja</p>
        </Col>
      </Row>
      <Row style={{ textAlign: 'center', backgroundColor: 'rgba(255, 172, 65, 0.8)' }}>
        <Col>
          <p>&copy; Miika Somero 2019</p>
        </Col>
      </Row>
    </>
  )
}

export default Footer