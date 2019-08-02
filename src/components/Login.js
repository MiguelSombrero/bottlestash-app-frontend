import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { loginUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Login = (props) => {

  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    props.loginUser(username, password)
    props.history.push('/')
  }

  const style = {
    
  }

  return (
    <div id='loginForm' style={style} >
      <h2>Login to Bottlestash</h2>
      <Form onSubmit={handleLogin} >
        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            placeholder='username'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='password'
          />
        </Form.Group>
        <Button id='login' variant='success' type='submit' block>Login</Button>
      </Form>
      <small>
        <strong>Not yet a member? Have no fear! You can register here: </strong>
        <Link to='/register' >Register</Link>
      </small>
    </div>
  )
}

const mapDispatchToProps = { loginUser }

export default connect(null, mapDispatchToProps)(withRouter(Login))