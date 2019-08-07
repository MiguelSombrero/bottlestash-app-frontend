import React from 'react'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'

const AddBottle = (props) => {

  const handleAddBottle = () => {
  
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='d-flex justify-content-center mb-2'>
          <h2>Add new bottle to your stash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          <Form onSubmit={handleAddBottle} id='addBottleForm' >
            <Form.Group >
            <Form.Label>Brewery</Form.Label>
              <Form.Control
                type='text'
                name='brewery'
                placeholder='name of the brewery'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='name of your beer'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Count</Form.Label>
              <Form.Control
                type='number'
                name='count'
                placeholder='number of bottles to save'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Volume</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                name='volume'
                placeholder='volume of the bottle in litres'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                step='0.01'
                name='price'
                placeholder='price of an one bottle'
              />
            </Form.Group>
            <Form.Row>
              <Form.Group className='p-2'>
                <Form.Label>Bottled</Form.Label>
                <Form.Control
                  type='date'
                  name='bottled'
                  placeholder='day beer was bottled'
                />
              </Form.Group>
              <Form.Group className='p-2'>
                <Form.Label>Expiration</Form.Label>
                <Form.Control
                  type='date'
                  name='expiration'
                  placeholder='expiration day of bottles'
                />
              </Form.Group>
            </Form.Row>
            <Button variant='success' type='submit' block>Add beer</Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default AddBottle