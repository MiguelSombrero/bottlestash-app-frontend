import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import loginService from '../services/login'
import { setUser, login } from '../reducers/userReducer'

const Login = (props) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({
        username, password
      })

      props.setUser(user)
      props.history.push('/')

    } catch (exception) {
      console.log('error message on Login dispatcher')
    }
  }

  return (
    <div>
      <h2>Login to Bottlestash</h2>
      <Form onSubmit={props.login} size='sm' >
        <Form.Group >
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            name='username'
            placeholder='username'
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            name='password'
            placeholder='password'
          />
          <Button variant='success' type='submit' block>Login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapDispatchToProps = { login }

export default connect(null, mapDispatchToProps)(withRouter(Login))