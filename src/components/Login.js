import React, { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Row, Col, Jumbotron, Container } from 'react-bootstrap'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { useTextField } from '../hooks'
import InputGroup from './InputGroup'

const Login = (props) => {
  const [validated, setValidated] = useState(false)
  const [username, usernameErrors] = useTextField('text', 5, 20, true)
  const [password, passwordErrors] = useTextField('password', 5, 20, true)

  const handleLogin = async (event) => {
    event.preventDefault()
    setValidated(true)

    if (!event.target.checkValidity()) {
      return
    }
    
    try {
      await props.loginUser({ username: username.value, password: password.value })
      props.history.push('/')
    } catch (exception) {
      props.setNotification('Login failed', 'error')
    }
  }

  return (
    <Container fluid>
      <Row>
        <Jumbotron as={Col} className='text-center'>
          <h2>Login to Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row id='loginForm'>
        <Col className='formstyle'>
          <Form noValidate validated={validated} onSubmit={handleLogin} >
            <InputGroup
              name='Username'
              state={username}
              placeholder='username'
              errors={usernameErrors}
            />
            <InputGroup
              name='Password'
              state={password}
              placeholder='password'
              errors={passwordErrors}
            />
            <Button id='login' variant='success' type='submit' block >Login</Button>
          </Form>
          <Row className='mt-2'>
            <Col className='text-center'>
              <small>
                  Not yet a member? 
                <Link to='/register'> Register here</Link>
              </small>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

const mapDispatchToProps = {
  loginUser, setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Login))