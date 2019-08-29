import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Jumbotron, Nav } from 'react-bootstrap'
import { NavLink, withRouter } from 'react-router-dom'
import { useTextField } from '../hooks'
import { connect } from 'react-redux'
import { removeUser, updateUser } from '../reducers/usersReducer'
import { addPicture } from '../reducers/picturesReducer'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const Profile = (props) => {
  const [validated, setValidated] = useState(false)
  const [picture, setPicture] = useState(null)
  const [name, nameErrors, setName] = useTextField('text', 1, 20, true)
  const [email, emailErrors, setEmail] = useTextField('text', 1, 50, true)
  const [city, cityErrors, setCity] = useTextField('text', 1, 50, false)
  const [country, countryErrors, setCountry] = useTextField('text', 1, 20, false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setName(props.user.name || '')
    setEmail(props.user.email || '')
    setCity(props.user.city || '')
    setCountry(props.user.country || '')
    setHidden(props.user.hidden)
  }, [])

  if (!props.user) {
    return null
  }
  
  const handleProfileUpdate = async (event) => {
    event.preventDefault()
    setValidated(true)

    if (!event.target.checkValidity()) {
      return
    }

    try {
      const newPicture = picture
        ? await props.addPicture(picture)
        : null

      const updateableUser = {
        name: name.value,
        email: email.value,
        city: city.value,
        country: country.value,
        pictureId: newPicture ? newPicture.id : null,
        hidden
      }
  
      await props.updateUser(props.user.id, updateableUser)
      props.setNotification('Profile saved!')

    } catch (exception) {
      props.setNotification('Saving profile failed!', 'error')
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile and all its data?')) {
      try {
        await props.removeUser(props.user.id)
        await props.logoutUser()
        props.setNotification('Your profile and data has been deleted')
        props.history.push('/')
  
      } catch (exception) {
        props.setNotification('Removing yor profile failed!', 'error')
      }
    }
  }

  return (
    <>
      <Row>
        <Jumbotron as={Col} className='text-center mb-2'>
          <h2>{props.user.username} profile</h2>
        </Jumbotron>
      </Row>
      <Row>
        <Col className='d-flex justify-content-center mb-4'>
          <Nav>
            <Nav.Link as='span' className='p-2'>
              <NavLink to={`/users/${props.user.id}/stash`} >Your stash</NavLink>
            </Nav.Link>
            <Nav.Link as='span' className='p-2'>
              <NavLink to={`/users/${props.user.id}/ratings`} >Your ratings</NavLink>
            </Nav.Link>
            <Nav.Link onClick={handleDelete} as='span' className='p-2'>
              Delete profile
            </Nav.Link>
          </Nav>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col >
          <Form noValidate validated={validated} style={{ maxWidth: '25rem', margin: 'auto' }} onSubmit={handleProfileUpdate} id='profileUpdateForm' >
            <Form.Group >
              <Form.Label>Name</Form.Label>
              <Form.Control {...name} />
              <Form.Control.Feedback type='invalid' >{nameErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group >
              <Form.Label>Email</Form.Label>
              <Form.Control {...email} />
              <Form.Control.Feedback type='invalid' >{emailErrors}</Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group style={{ maxWidth: '50%' }} className='p-2'>
                <Form.Label>City</Form.Label>
                <Form.Control {...city} />
                <Form.Control.Feedback type='invalid' >{cityErrors}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group style={{ maxWidth: '50%' }} className='p-2'>
                <Form.Label>Country</Form.Label>
                <Form.Control {...country} />
                <Form.Control.Feedback type='invalid' >{countryErrors}</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check
                type='checkbox'
                checked={hidden}
                onChange={({ target }) => setHidden(target.checked)}
                label='I want my stash to be private' />
            </Form.Group>
            <Form.Group className='custom-file mb-4 p-2'>
              <Form.Label className='custom-file-label'>Click to add profile picture</Form.Label>
              <Form.Control
                name='picture'
                className='custom-file-input'
                type='file'
                accept='image/*'
                onChange={({ target }) => setPicture(target.files[0])}
              />
              {picture &&
              <Form.Text className='text-center'>{picture.name}</Form.Text>
              }
            </Form.Group>
            <Button type='submit' variant='success' block>Save profile</Button>
          </Form>
        </Col>
      </Row>
    </>
  )
}

const mapDispatchToProps = {
  removeUser,
  updateUser,
  logoutUser,
  addPicture,
  setNotification
}

export default connect(null, mapDispatchToProps)(withRouter(Profile))
