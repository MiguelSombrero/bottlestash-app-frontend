import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Button, Row, Col, Jumbotron, Container } from 'react-bootstrap'
import { registerUser } from '../reducers/usersReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useTextField } from '../hooks'
import InputGroup from './InputGroup'

const Register = (props) => {
  const [validated, setValidated] = useState(false)
  const [username, usernameErrors] = useTextField('text', 5, 20, true)
  const [password, passwordErrors] = useTextField('password', 5, 20, true)
  const [name, nameErrors] = useTextField('text', 1, 20, true)
  const [email, emailErrors] = useTextField('text', 1, 50, true)
  const [city, cityErrors] = useTextField('text', 1, 50, false)
  const [country, countryErrors] = useTextField('text', 1, 50, false)
  const [hidden, setHidden] = useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()
    
    if (!event.target.checkValidity()) {
      setValidated(true)
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
  
      props.setNotification('Registration was succesfull')
      props.history.push('/login')
    
    } catch (exception) {
      props.setNotification('Registration failed', 'error')
    }  
  }

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Register to Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row className='mb-3'>
        <Col className='formstyle'>
          <Form noValidate validated={validated} onSubmit={handleRegister} id='registerForm' >
            <InputGroup
              name='Username'
              state={username}
              placeholder='username (not showing others)'
              errors={usernameErrors}
            />
            <InputGroup
              name='Password'
              state={password}
              placeholder='password'
              errors={passwordErrors}
            />
            <InputGroup
              name='Name'
              state={name}
              placeholder='name (to show other users)'
              errors={nameErrors}
            />
            <InputGroup
              name='Email'
              state={email}
              placeholder='email'
              errors={emailErrors}
            />

            <Form.Row>
              <Col style={{ maxWidth: '50%' }} className='p-2'>
                <InputGroup
                  name='City'
                  state={city}
                  placeholder='(optional)'
                  errors={cityErrors}
                />
              </Col>
              <Col style={{ maxWidth: '50%' }} className='p-2'>
                <InputGroup
                  name='Country'
                  state={country}
                  placeholder='(optional)'
                  errors={countryErrors}
                />
              </Col>
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
    </Container>
  )
}

const mapDispatchToProps = {
  registerUser, setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Register))