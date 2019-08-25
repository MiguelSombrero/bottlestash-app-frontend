import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Row, Col, Jumbotron } from 'react-bootstrap'
import { loginUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { useTextField } from '../hooks'

const Login = (props) => {
  const [username] = useTextField('text', 5, 20, true)
  const [password] = useTextField('password', 5, 20, true)

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
        <Jumbotron as={Col} className='text-center'>
          <h2>Login to Bottlestash</h2>
        </Jumbotron>
      </Row>
      <Row id='loginForm' >
        <Col style={{ maxWidth: '25rem', margin: 'auto' }}>
          <Form onSubmit={handleLogin} >
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
      <Row className='m-2 p-2'>
        <Col style={{ maxWidth: '20rem', margin: 'auto' }}>
          <small>
            Not yet a member? 
            <Link to='/register'> Register here</Link>
          </small>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = {
  loginUser
}

export default connect(null, mapDispatchToProps)(withRouter(Login))