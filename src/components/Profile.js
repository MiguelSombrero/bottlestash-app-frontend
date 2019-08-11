import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

const Profile = (props) => {
  if (!props.location.state.user) {
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
              <Form.Control
                type='text'
                name='name'
                defaultValue={user.name}
              />
            </Form.Group>
            <Form.Group >
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                defaultValue={user.email}
              />
            </Form.Group>
            <Form.Row>
              <Form.Group className='p-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  name='city'
                  defaultValue={user.city}
                />
              </Form.Group>
              <Form.Group className='p-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  name='name'
                  defaultValue={user.country}
                />
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
