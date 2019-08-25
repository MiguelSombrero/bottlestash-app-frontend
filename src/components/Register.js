import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Row, Col, Jumbotron } from 'react-bootstrap'
import { registerUser } from '../reducers/usersReducer'
import { useTextField } from '../hooks'

const Register = (props) => {
  const [validated, setValidated] = useState(false)
  const [username, usernameErrors] = useTextField('text', 5, 20, true)
  const [password, passwordErrors] = useTextField('password', 5, 20, true)
  const [name, nameErrors] = useTextField('text', 1, 20, true)
  const [email, emailErrors] = useTextField('text', 1, 50, true)
  const [city, cityErrors] = useTextField('text', 1, 50, false)
  const [country, countryErrors] = useTextField('text', 1, 20, false)
  const [hidden, setHidden] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()
    setValidated(true)

    if (!event.target.checkValidity()) {
      return
    }
    
    try {
      await props.registerUser({
        username: username.value,
        password: password.value,
        name: name.value,
        email: email.value,
        city: city.value,
        country: country.value,
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
        <Jumbotron as={Col} className='text-center'>
          <h2>Register to Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col style={{ maxWidth: '25rem', margin: 'auto' }}>
          <Form noValidate validated={validated} onSubmit={handleRegister} id='registerForm' >
            <Form.Group >
              <Form.Label >Username</Form.Label>
              <Form.Control {...username} placeholder='username' />
              <Form.Control.Feedback type='invalid' >{usernameErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} placeholder='password' />
              <Form.Control.Feedback type='invalid' >{passwordErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control {...name} placeholder='name to show other users' />
              <Form.Control.Feedback type='invalid' >{nameErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control {...email} placeholder='email' />
              <Form.Control.Feedback type='invalid' >{emailErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col} className='p-2'>
                <Form.Label>City</Form.Label>
                <Form.Control {...city} placeholder='what city your stash at' />
                <Form.Control.Feedback type='invalid' >{cityErrors}</Form.Control.Feedback>
              </Form.Group >
              <Form.Group as={Col} className='p-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control {...country} placeholder='what country your stash at' />
                <Form.Control.Feedback type='invalid' >{countryErrors}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check
                type='checkbox'
                onChange={({ target }) => setHidden(target.checked)}
                label='I want my stash to be private' />
            </Form.Group>
            <Button variant='success' type='submit' block>Register</Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = {
  registerUser
}

export default connect(null, mapDispatchToProps)(withRouter(Register))