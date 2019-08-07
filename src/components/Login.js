import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Row, Col, Jumbotron } from 'react-bootstrap'
import { loginUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'

const Login = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      await props.loginUser(username, password)
      props.history.push('/')
    } catch (exception) {
      console.log('error message on Login dispatcher')
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
              <Form.Control
                id='username'
                type='text'
                name='username'
                placeholder='username'
              />
            </Form.Group>
            <Form.Group >
              <Form.Label>Password</Form.Label>
              <Form.Control
                id='password'
                type='password'
                name='password'
                placeholder='password'
              />
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

const mapDispatchToProps = { loginUser }

export default connect(null, mapDispatchToProps)(withRouter(Login))