import React from 'react'
import { Card, Accordion, Form, Button } from 'react-bootstrap'

const AddBottle = (props) => {

  const handleAddBottle = () => {
  
  }

  return (
    <Accordion >
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey='0'>
          <h3>Add bottle to your stash</h3>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey='0'>
          <Form onSubmit={handleAddBottle} >
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
            <Button variant='success' type='submit' block>Add beer</Button>
          </Form>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

export default AddBottle