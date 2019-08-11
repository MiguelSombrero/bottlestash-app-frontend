import React from 'react'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'

const Rate = (props) => {

  const handleRate = () => {

  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='d-flex justify-content-center mb-2'>
            <h2>Give rating to this beer</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          <Form onSubmit={handleRate} id='rateForm' >
            <Form.Group >
              <Form.Label>Aroma</Form.Label>
              <Form.Control
                type='range'
                name='aroma'
                min='0'
                max='10'
                step='1'
              />
            </Form.Group>
            <Button type='submit' variant='success'>Add rating</Button>
          </Form>
        </Col>
      </Row>    
    </>
  )
}

export default Rate