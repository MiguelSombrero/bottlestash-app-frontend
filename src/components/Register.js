import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Row, Col, Jumbotron } from 'react-bootstrap'
import userService from '../services/users'

const Register = (props) => {

  const handleRegister = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    const name = event.target.name.value
    const email = event.target.email.value
    const city = event.target.city.value
    const country = event.target.country.value
    const hidden = event.target.hidden.checked

    try {
      await userService.create({
        username, password, name, email, city, country, hidden
      })

      // tähän notifikaatio onnistumisesta!

      props.history.push('/login')
  
    } catch (exception) {
      console.log('error message on createUser dispatcher')
    }
  }

  const style = {
    
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
          <Form onSubmit={handleRegister} id='registerForm' style={style} >
            <Form.Group >
              <Form.Label >Username</Form.Label>
              <Form.Control
                type='text'
                name='username'
                placeholder='your secret username'
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
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                name='name'
                placeholder='name to show other users'
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='text'
                name='email'
                placeholder='email'
              />
            </Form.Group>
            <Form.Row>
              <Form.Group className='p-2'>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type='text'
                  name='city'
                  placeholder='what city your stash at'
                />
              </Form.Group>
              <Form.Group className='p-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type='text'
                  name='country'
                  placeholder='what country your stash at'
                />
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

export default withRouter(Register)