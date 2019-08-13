import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Row, Col, Jumbotron } from 'react-bootstrap'
import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { useTextField } from '../hooks'

const Login = (props) => {
  const username = useTextField('text', 5, 20, true)
  const password = useTextField('password', 5, 20, true)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      await props.loginUser(username.value, password.value)
      props.history.push('/')
    } catch (exception) {
      props.setNotification('Login failed', 'error')
    }
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='d-flex justify-content-center mb-2'>
          <h2>Login to Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row id='loginForm' >
        <Col className='d-flex justify-content-center mb-2'>
          <Form onSubmit={handleLogin} style={{ width: '20rem' }} >
            <Form.Group  >
              <Form.Label>Username</Form.Label>
              <Form.Control {...username} placeholder='username' />
            </Form.Group>
            <Form.Group >
              <Form.Label>Password</Form.Label>
              <Form.Control {...password} placeholder='password' />
            </Form.Group>
            <Button id='login' variant='success' type='submit' block >Login</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-2'>
          <small>
            Not yet a member? 
            <Link to='/register'> Register here:</Link>
          </small>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = {
  loginUser,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Login))