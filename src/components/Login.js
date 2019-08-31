import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, Row, Col, Jumbotron, Container } from 'react-bootstrap'
import { loginUser } from '../reducers/loginReducer'
import { Link } from 'react-router-dom'
import { useTextField } from '../hooks'

const Login = (props) => {
  const [username] = useTextField('text', 5, 20, true)
  const [password] = useTextField('password', 5, 20, true)

  const handleLogin = async (event) => {
    event.preventDefault()
    
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
  loginUser
}

export default connect(null, mapDispatchToProps)(withRouter(Login))