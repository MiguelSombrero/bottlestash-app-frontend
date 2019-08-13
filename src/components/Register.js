import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Row, Col, Jumbotron } from 'react-bootstrap'
import { registerUser } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useTextField } from '../hooks'

const Register = (props) => {
  const username = useTextField('text', 5, 20, true)
  const password = useTextField('password', 5, 20, true)
  const name = useTextField('text', 1, 20, true)
  const email = useTextField('text', 1, 50, true)
  const city = useTextField('text', 1, 50, false)
  const country = useTextField('text', 1, 20, false)

  const handleRegister = async (event) => {
    event.preventDefault()
    const hidden = event.target.hidden.checked

    try {
      await props.registerUser({
        username: username.value,
        password: password.value,
        name: name.value,
        email: email.value,
        city: city.value,
        county: country.value,
        hidden
      })

      props.setNotification('User registration was succesfull')
      props.history.push('/login')
  
    } catch (exception) {
      props.setNotification('User registration failed', 'error')
    }
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='d-flex justify-content-center mb-2'>
          <h2>Register to Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          <Form onSubmit={handleRegister} style={{ width: '20rem' }} id='registerForm' >
            <Form.Group >
              <Form.Label >Username</Form.Label>
              <Form.Control {...username} placeholder='username' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} placeholder='password' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control {...name} placeholder='name to show other users' />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control {...email} placeholder='email' />
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} className='p-2'>
                <Form.Label>City</Form.Label>
                <Form.Control {...city} placeholder='what city your stash at' />
              </Form.Group >
              <Form.Group as={Col} className='p-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control {...country} placeholder='what country your stash at' />
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check type='checkbox' name='hidden' label='I want my stash to be private' />
            </Form.Group>
            <Button variant='success' type='submit' block>Register</Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = {
  registerUser, setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Register))