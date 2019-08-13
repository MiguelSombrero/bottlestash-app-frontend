import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { useTextField } from '../hooks'

const Profile = (props) => {
  const name = useTextField('text', 1, 20, true)
  const email = useTextField('text', 1, 50, true)
  const city = useTextField('text', 1, 50, false)
  const country = useTextField('text', 1, 20, false)

  if (!props.location.state) {
    return null
  }

  const user = props.location.state.user

  const handleProfileUpdate = () => {

  }

  const handleDelete = () => {

  }

  return (
    <>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          <Form onSubmit={handleProfileUpdate} id='profileUpdateForm' >
            <Form.Group>
              <Form.Text>Username: {user.username}</Form.Text>  
            </Form.Group>
            <Form.Group >
              <Form.Label>Name</Form.Label>
              <Form.Control {...name} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Email</Form.Label>
              <Form.Control {...email} />
            </Form.Group>
            <Form.Row>
              <Form.Group className='p-2'>
                <Form.Label>City</Form.Label>
                <Form.Control {...city} />
              </Form.Group>
              <Form.Group className='p-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control {...country} />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check
                type='checkbox'
                name='hidden'
                defaultValue={user.hidden}
                label='I want my stash to be private' />
            </Form.Group>
            <Button type='submit' variant='success'>Save profile</Button>
          </Form>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center mb-2'>
        <Button onClick={handleDelete}>Delete profile</Button>
      </Row>
    </>
  )
}

export default Profile
