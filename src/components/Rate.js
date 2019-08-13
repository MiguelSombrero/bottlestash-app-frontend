import React from 'react'
import { Row, Col, Jumbotron, Form, Button } from 'react-bootstrap'
import { useNumberField } from '../hooks'

const Rate = (props) => {
  const aroma = useNumberField('range', 0, 10, 1, true)
  const taste = useNumberField('range', 0, 10, 1, true)
  const appearance = useNumberField('range', 0, 5, 1, true)
  const mouthfeel = useNumberField('range', 0, 5, 1, true)
  const overall = useNumberField('range', 0, 20, 1, true)

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
              <Form.Text>{aroma.value || 0}</Form.Text>
              <Form.Control {...aroma} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Taste</Form.Label>
              <Form.Text>{taste.value || 0}</Form.Text>
              <Form.Control {...taste} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Appearance</Form.Label>
              <Form.Text>{appearance.value || 0}</Form.Text>
              <Form.Control {...appearance} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Mouthfeel</Form.Label>
              <Form.Text>{mouthfeel.value || 0}</Form.Text>
              <Form.Control {...mouthfeel} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Overall</Form.Label>
              <Form.Text>{overall.value || 0}</Form.Text>
              <Form.Control {...overall} />
            </Form.Group>
            <Button type='submit' variant='success'>Add rating</Button>
          </Form>
        </Col>
      </Row>    
    </>
  )
}

export default Rate